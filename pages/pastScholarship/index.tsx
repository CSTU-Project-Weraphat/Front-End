import Layout from '@/components/layout';
import { useQuery } from 'react-query';
import { getScholarship, scholarshipData } from '@/dataService/getscholarship';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';
import { useState } from 'react';
import { Select, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { ColumnsType } from 'antd/es/table';

dayjs.extend(buddhistEra);
type filterDataType = {
    scholarship_type_id?: string;
    schoalrship_year?: string;
};
export default function PastScholarship() {
    const { data: scholarship } = useQuery({
        queryKey: 'scholarship',
        queryFn: async () => getScholarship(),
    });
    const [filterData, setfilterData] = useState<filterDataType>();
    const columns: ColumnsType<scholarshipData> = [
        {
            title: 'ชื่อทุนการศึกษา',
            dataIndex: 'scholarship_name',
            key: 'scholarship_name',
        },
        {
            title: 'ปีการศึกษา',
            dataIndex: 'scholarship_year',
            key: 'scholarship_year',
        },
        {
            title: 'วันที่สิ้นสุดโครงการ',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (value: string) => (
                <div>{dayjs(value).locale('th').format('DD MMMM BBBB')}</div>
            ),
        },
        {
            title: 'ประเภท',
            dataIndex: 'scholarship_type_name',
            key: 'scholarship_type_name',
        },
    ];

    return (
        <Layout title="ประวัติทุนการศึกษา">
            <div className="">
                <div className=" mx-auto max-w-3xl lg:max-w-7xl pt-10 ">
                    <div className="flex flex-warp">
                        <div className="w-full flex">
                            <div className="form-control w-full max-w-xs pb-5 lg:pr-5">
                                <label className="label">
                                    <span className="label-text">ประเภททุนการศึกษา</span>
                                </label>
                                <Select
                                    value={filterData?.scholarship_type_id}
                                    onChange={(value) => {
                                        setfilterData({
                                            ...filterData,
                                            scholarship_type_id: value,
                                        });
                                    }}
                                    placeholder="เลือกประเภททุน"
                                >
                                    <Select.Option selected value="alltype">
                                        ทุกประเภท
                                    </Select.Option>
                                    <Select.Option value="in">ทุนภายใน</Select.Option>
                                    <Select.Option value="out">ทุนภายนอก</Select.Option>
                                </Select>
                            </div>
                            <div className="form-control w-full max-w-xs pb-5 lg:pl-5">
                                <label className="label">
                                    <span className="label-text">ปีการศึกษา</span>
                                </label>
                                <Select
                                    value={filterData?.schoalrship_year}
                                    onChange={(value) => {
                                        setfilterData({
                                            ...filterData,
                                            schoalrship_year: value,
                                        });
                                    }}
                                    placeholder="เลือกประเภททุน"
                                >
                                    <Select.Option selected value="alltype">
                                        ทุกปีการศึกษา
                                    </Select.Option>
                                    <Select.Option value="2566">ปีการศึกษา 2566</Select.Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <Table
                        dataSource={scholarship?.result}
                        columns={columns}
                        bordered
                        pagination={false}
                    />
                </div>
            </div>
        </Layout>
    );
}
