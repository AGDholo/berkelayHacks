import {Link, useParams} from "react-router-dom";
import useSWR from "swr";
import {fetcher, hcbApi} from "../config/api.ts";
import {OrganizationType} from "../types/organizationType.ts";
import {Box, Card, Chip, Grid, Icon, Stack, Typography} from "@mui/material";
import {BarChart, LineChart} from "@mui/x-charts";
import {DonationTransaction} from "../types/donationType.ts";
import {useEffect, useState} from "react";
import {InvoiceType} from "../types/invoiceType.ts";
import {AccountBalanceOutlined, ArrowCircleLeftOutlined} from "@mui/icons-material";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency', // 指定格式化样式为货币
    currency: 'USD', // 设置货币类型为美元
});

const Organization = () => {
    const {id} = useParams()
    const {data} = useSWR<OrganizationType>(`${hcbApi}/api/v3/organizations/${id}`, fetcher)

    const {data: donations} = useSWR<DonationTransaction[]>(`${hcbApi}/api/v3/organizations/${id}/donations`, fetcher)
    const [donationMonths, setDonationMonths] = useState<string[]>([]);
    const [donationAmounts, setDonationAmounts] = useState<number[]>([]);

    const {data: invoice} = useSWR<InvoiceType[]>(`${hcbApi}/api/v3/organizations/${id}/invoices`, fetcher)
    const [invoiceMonths, setInvoiceMonths] = useState<string[]>([]);
    const [invoiceAmounts, setInvoiceAmounts] = useState<number[]>([]);

    useEffect(() => {
        // 明确地声明累加器的类型
        if (donations && donations.length > 0) {
            const summary = donations.reduce<{ [key: string]: number }>((acc, donation) => {
                const month = donation.date.substring(0, 7); // "YYYY-MM"
                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += donation.amount_cents;
                return acc;
            }, {});

            // 将结果分解为两个数组，并对月份进行倒序排序
            const sortedMonths = Object.keys(summary).sort((a, b) => a.localeCompare(b));
            // 根据排序后的月份数组重新组织金额数组
            const sortedAmounts = sortedMonths.map(month => summary[month] / 100); // 转换为美元

            setDonationMonths(sortedMonths);
            setDonationAmounts(sortedAmounts);
        }

    }, [donations]);

    useEffect(() => {
        // 明确地声明累加器的类型
        if (invoice && invoice.length > 0) {
            const summary = invoice.reduce<{ [key: string]: number }>((acc, i) => {
                const month = i.date.substring(0, 7); // "YYYY-MM"
                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += i.amount_cents;
                return acc;
            }, {});

            // 将结果分解为两个数组，并对月份进行倒序排序
            const sortedMonths = Object.keys(summary).sort((a, b) => a.localeCompare(b));
            // 根据排序后的月份数组重新组织金额数组
            const sortedAmounts = sortedMonths.map(month => summary[month] / 100); // 转换为美元

            setInvoiceMonths(sortedMonths);
            setInvoiceAmounts(sortedAmounts);
        }

    }, [invoice]);


    return (
        <div>
            <Stack spacing={1}
                   direction={"row"}>
                <Stack spacing={1}
                       direction={"row"}
                       alignItems={'center'}>
                    <Icon component={Link}
                          sx={{
                              alignSelf: 'center',
                          }}
                          to={'/'}>
                        <ArrowCircleLeftOutlined

                        />
                    </Icon>

                    {data?.logo && (
                        <img src={data?.logo}
                             width={30}
                             height={30}/>
                    )}

                    <Typography variant={"h2"}>
                        {data?.name}
                    </Typography>
                </Stack>

                <Stack spacing={1}
                       direction={'row'}>
                    <Chip label={data?.slug}
                    />

                    <Chip label={data?.category}
                    />
                </Stack>
            </Stack>


            <Grid container>
                <Grid item
                      xs={12}
                      md={8}>
                    <Grid container
                          sx={{
                              mt: 1
                          }}
                          spacing={2}>
                        <Grid item
                              xs={6}
                              lg={3}>
                            <Card sx={{
                                padding: 2,
                                boxShadow: 'none',
                                border: '1px solid #e0e0e0'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <AccountBalanceOutlined sx={{
                                        mr: 1
                                    }}/> Balance
                                </Box>
                                <Typography
                                    textOverflow={"ellipsis"}
                                    variant={"h1"}
                                    sx={{
                                        mt: 1
                                    }}>
                                    {formatter.format(data?.balances.balance_cents ?? 0)}
                                </Typography>
                            </Card>
                        </Grid>

                        <Grid item
                              xs={6}
                              lg={3}>
                            <Card sx={{
                                padding: 2,
                                boxShadow: 'none',
                                border: '1px solid #e0e0e0'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <AccountBalanceOutlined sx={{
                                        mr: 1
                                    }}/>
                                    Total Raised
                                </Box>
                                <Typography variant={"h1"}
                                            sx={{
                                                mt: 1
                                            }}>
                                    {formatter.format(data?.balances.total_raised ?? 0)}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item
                              xs={6}
                              lg={3}>
                            <Card sx={{
                                padding: 2,
                                boxShadow: 'none',
                                border: '1px solid #e0e0e0'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <AccountBalanceOutlined sx={{
                                        mr: 1
                                    }}/>
                                    Incoming
                                </Box>
                                <Typography variant={"h1"}
                                            sx={{
                                                mt: 1
                                            }}>
                                    {formatter.format(data?.balances.incoming_balance_cents ?? 0)}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item
                              xs={6}
                              lg={3}>
                            <Card sx={{
                                padding: 2,
                                boxShadow: 'none',
                                border: '1px solid #e0e0e0'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <AccountBalanceOutlined sx={{
                                        mr: 1
                                    }}/>
                                    Fee
                                </Box>
                                <Typography variant={"h1"}
                                            sx={{
                                                mt: 1
                                            }}>
                                    {formatter.format(data?.balances.fee_balance_cents ?? 0)}
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>


                    <Box sx={{
                        mt: 2
                    }}>
                        {
                            donationMonths && donationAmounts && donations && donations.length > 0 ? (
                                <LineChart
                                    xAxis={[{
                                        scaleType: 'point',
                                        data: donationMonths
                                    }]}
                                    series={[
                                        {
                                            label: 'Donations',
                                            data: donationAmounts
                                        },
                                    ]}
                                    height={300}
                                />
                            ) : (
                                <div>
                                    No donations
                                </div>
                            )
                        }

                    </Box>
                </Grid>

                <Grid item
                      xs={12}
                      md={4}>
                    <Grid container>
                        <Grid item
                              xs={12}>
                            {
                                donationMonths && donationAmounts && donations && donations.length > 0 ? (
                                    <BarChart
                                        xAxis={[{scaleType: 'band', data: donationMonths}]}
                                        series={[{data: donationAmounts, label: 'Donations'}]}
                                        height={300}
                                    />
                                ) : (
                                    <div>
                                        No donations
                                    </div>
                                )
                            }
                        </Grid>

                        <Grid item
                              xs={12}
                        >
                            {
                                invoiceMonths && invoiceAmounts && invoice && invoice.length > 0 ? (
                                    <BarChart
                                        colors={['#ef5350']}
                                        xAxis={[{scaleType: 'band', data: invoiceMonths}]}
                                        series={[{data: invoiceAmounts, label: 'Invoices'}]}
                                        height={300}
                                    />
                                ) : (
                                    <div>
                                        No invoices
                                    </div>
                                )}
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    );
}

export default Organization;