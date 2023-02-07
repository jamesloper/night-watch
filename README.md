# Night Watch

This project currently proxies feeds from cameras to view in a password protected dashboard. What else should it do? You
tell me!

To run a development environment, you must be running a Wyze bridge docker instance
https://github.com/mrlt8/docker-wyze-bridge

To start the server, simply run `meteor run` and it should boot right up. You can log in using _demo@demo.com_ with password _demo_ but take a look
in `/server/methods/accounts.js` to see the details.

## Supported Cameras

| Camera                        | Model          | Supported                                                    |
|-------------------------------|----------------|--------------------------------------------------------------|
| Wyze Cam v1 [HD only]         | WYZEC1         | ✅                                                            |
| Wyze Cam V2                   | WYZEC1-JZ      | ✅                                                            |
| Wyze Cam V3                   | WYZE_CAKP2JFUS | ✅                                                            |
| Wyze Cam V3 Pro [2K]          | HL_CAM3P       | ✅                                                            |
| Wyze Cam Floodlight           | WYZE_CAKP2JFUS | ✅                                                            |
| Wyze Cam Pan                  | WYZECP1_JEF    | ✅                                                            |
| Wyze Cam Pan v2               | HL_PAN2        | ✅                                                            |
| Wyze Cam Pan v3               | HL_PAN3        | ✅                                                            |
| Wyze Cam Pan Pro [2K]         | HL_PANP        | ✅                                                            |
| Wyze Cam Outdoor              | WVOD1          | ✅                                                            |
| Wyze Cam Outdoor v2           | HL_WCO2        | ✅                                                            |
| Wyze Cam Doorbell             | WYZEDB3        | ✅                                                            |
| Wyze Battery Cam Pro          | AN_RSCW        | ❓                                                            |
| Wyze Cam Doorbell Pro 2       | AN_RDB1        | ❓                                                            |
| Wyze Cam Flood Light Pro [2K] | LD_CFP         | ❓                                                            |
| Wyze Cam Doorbell Pro         | GW_BE1         | [⚠️](https://github.com/mrlt8/docker-wyze-bridge/issues/276) |
| Wyze Cam OG                   | GW_GC1         | [⚠️](https://github.com/mrlt8/docker-wyze-bridge/issues/677) |
| Wyze Cam OG Telephoto 3x      | GW_GC2         | [⚠️](https://github.com/mrlt8/docker-wyze-bridge/issues/677) |
