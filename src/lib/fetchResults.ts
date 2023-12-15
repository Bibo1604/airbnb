import { SearchParams } from '@/app/search/page';
import React from 'react'
import { Result } from '../../typings';

export async function fetchResults(searchParams: SearchParams) {
    const username = process.env.OXYLABS_USERNAME;
    const password = process.env.OXYLABS_PASSWORD;

    const url = new URL(searchParams.url);
    Object.keys(searchParams).forEach((key) => {
        if (key === "url" || key === "destination") {
            return
        }

        const value = searchParams[key as keyof SearchParams];

        if (typeof value === "string") {
            url.searchParams.append(key, value);
        }
    });

    console.log("scraping url >>>", url.href);

    const body = {
        source: "universal",
        url: url.href,
        parse: true,
        geo_location: 'United States',
        render: "html",
        parsing_instructions: {
            listings: {
                _fns: [
                    {
                        _fn: "xpath",
                        _args: ["//div[@data-testid='card-container']"],
                    },
                ],
                _items: {
                    url: {
                        _fns: [
                            {
                                _fn: "xpath_one",
                                _args: [".//img/@src"],
                            }
                        ]
                    },
                    title: {
                        _fns: [
                            {
                                _fn: "xpath_one",
                                _args: [".//div[@data-testid='listing-card-title']/text()"],
                            }
                        ]
                    },
                    subtitle: {
                        _fns: [
                            {
                                _fn: "xpath_one",
                                _args: [".//span[@data-testid='listing-card-name']/text()"],
                            }
                        ]
                    },
                    rating: {
                        _fns: [
                            {
                                _fn: "xpath_one",
                                _args: [".//span[contains(@class, 'r1dxllyb atm_7l_18pqv07 atm_cp_1ts48j8 dir dir-ltr')]/text()"],
                            }
                        ]
                    },
                    price: {
                        _fns: [
                            {
                                _fn: "xpath_one",
                                _args: [".//span[contains(@class, '_14y1gc')]/span[contains(@class, 'a8jt5op atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr')]/text()"]
                            }
                        ]
                    },
                    total_price: {
                        _fns: [
                            {
                                _fn: "xpath_one",
                                _args: [".//div[contains(@class, '_xtmo1j9')]/span[contains(@class, 'a8jt5op atm_3f_idpfg4 atm_7h_hxbz6r atm_7i_ysn8ba atm_e2_t94yts atm_ks_zryt35 atm_l8_idpfg4 atm_mk_stnw88 atm_vv_1q9ccgz atm_vy_t94yts dir dir-ltr')]/text()"]
                            }
                        ]
                    },
                    link: {
                        _fns: [
                            {
                                _fn: "xpath_one",
                                _args: [".//a[contains(@class, 'rfexzly atm_9s_1ulexfb atm_7l_1j28jx2 atm_e2_1osqo2v dir dir-ltr')]/@href"]
                            }
                        ]
                    }
                }
            },
            total_listings: {
                _fns: [
                    {
                        _fn: "xpath",
                        _args: [`.//span[@class='tyi4kqb atm_c8_fkimz8 atm_g3_11yl58k atm_fr_4ym3tx atm_cs_qo5vgd dir dir-ltr']/text()`],
                    }
                ]
            }
        }
    }

    const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
        method: "POST",
        body: JSON.stringify(body),
        next: {
            revalidate: 60 * 60, // cache for 1 hour
        },
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
        },
    }).then((response) => response.json()).then((data) => {
        if (data.results.length === 0) {
            return;
        }

        const result: Result = data.results[0];
        return result;
    }).catch((error) => console.log(error));

    return response;
}
