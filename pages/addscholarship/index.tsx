import Layout from '@/components/layout';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import DatePicker from '@/components/date_picker';
import { Button, DatePicker, Form, Modal, Select, Table } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { Input } from 'antd';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';
import { getScholarship, scholarshipData } from '@/dataService/getscholarship';
import { useMutation, useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';
import {
    createScholarshipPlayload,
    postCreateScholarship,
} from '@/dataService/postCreateScholarship';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { HexColorPicker } from 'react-colorful';
import { useRouter } from 'next/router';
import { getDate } from '@/utils/getDate';

dayjs.extend(buddhistEra);
type filterDataType = {
    class_type_name?: string;
    schoalrship_year?: string;
};

interface createScholarshipForm extends createScholarshipPlayload {
    date_rang: Date[];
}
//1.สร้าง type สำหรับข้อมูลในพร้อม
export default function Addscholarship() {
    const Router = useRouter();

    const fileTypes = ['PDF'];

    const [filterData, setfilterData] = useState<filterDataType>();

    const [file, setFile] = useState(null);
    const handleChange = (file: any): void => {
        setFile(file);
    };

    const { mutate, isLoading } = useMutation({
        mutationKey: 'createscholarship',
        mutationFn: async (result: createScholarshipPlayload) => {
            return postCreateScholarship(result);
        },
        onSuccess: () => {
            Swal.fire('เพิ่มทุนการศึกษา', 'คุณเพิ่มทุนการศึกษาสำเร็จ', 'success');
            Router.push('/manageScholarship');
        },
        onError: () => {
            Swal.fire('เพิ่มทุนการศึกษา', 'คุณเพิ่มทุนการศึกษาไม่สำเร็จ', 'error');
        },
        //5.เขียน create_scholarship()=>{}
        //6. ถ้า success ให้กลับมาหน้าจัดการทุน
        //7. ถ้า fail ไม่ไป
    });

    // const onSubmit = (result: createScholarshipPlayload) => {
    //     const normalResult: createScholarshipPlayload = {
    //         scholarship_name: result.scholarship_name,
    //         scholarship_year: result.scholarship_year,
    //         start_date: result.start_date,
    //         end_date: result.end_date,
    //         scholarship_grade: result.scholarship_grade,
    //         class_type_name: result.class_type_name,
    //         scholarship_condition_name: result.scholarship_condition_name,
    //         tag_color: result.tag_color,
    //     };
    //     console.log(normalResult);
    //     Swal.fire({
    //         title: 'ยืนยันเพิ่มทุนการศึกษาใช่หรือไม่?',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'ยืนยัน',
    //         cancelButtonText: 'ยกเลิก',
    //     }).then((result: any) => {
    //         if (result.isConfirmed) {
    //             mutate(normalResult);
    //         }
    //     });
    //     //3.เรียกใช้ swal
    //     //4.เรียกใช้งาน usemutate โดยทำข้อมูลให้อยู่ใน type ที่ต้องการ
    //     //2.ต้องเขียนเงื่อนไข(กรอกข้อมูลให้ครบยกเว้น pdf)ก่อน submit
    // };
    // const { data: scholarship } = useQuery({
    //     queryKey: 'scholarship',
    //     queryFn: async () => getScholarship(),
    // });
    // const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    //     // Can not select days before today and today
    //     return current && current < dayjs().locale('th').endOf('day');
    // };
    const [color, setColor] = useState<string>();

    const [form] = Form.useForm<createScholarshipForm>();

    const onHandleSubmit = (value: createScholarshipForm): void => {
        const normalResult: createScholarshipPlayload = {
            scholarship_name: value.scholarship_name,
            scholarship_year: value.scholarship_year,
            start_date: value.date_rang ? value.date_rang[0].toJSON() : undefined,
            end_date: value.date_rang ? value.date_rang[1].toJSON() : undefined,
            scholarship_grade: value.scholarship_grade,
            class_type_id: value.class_type_id,
            scholarship_type_id: value.scholarship_type_id,
            scholarship_condition_name: value.scholarship_condition_name,
            scholarship_qualification_name: value.scholarship_qualification_name,
            tag_color: value.tag_color,
        };
        console.log(normalResult);
        Swal.fire({
            title: 'ยืนยันเพิ่มทุนการศึกษาใช่หรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
        }).then((result: any) => {
            if (result.isConfirmed) {
                mutate(normalResult);
            }
        });
    };
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleOk = () => {
        form.setFieldValue('tag_color', color);
        setOpen(false);
    };

    return (
        <Layout title="จัดการทุกการศึกษา" subTitle="เพิ่มทุนการศึกษา">
            <div className="">
                <div className="mx-auto max-w-3xl lg:max-w-7xl pt-10">
                    <div className="w-full h-3/5 border rounded-md shadow-lg p-3 mb-3 mt-3 space-y-5 bg-white">
                        <Form form={form} onFinish={onHandleSubmit}>
                            <div className="font-medium text-lg p-10">
                                <label className="lebel">
                                    <div className="flex items-center mt-3  w-full">
                                        <span className="label-text text-lg w-2/5 ">
                                            ชื่อทุนการศึกษา
                                        </span>

                                        <div className="w-full">
                                            <Form.Item
                                                name="scholarship_name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณากรอกชื่อทุนการศึกษา!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="ชื่อทุนการศึกษา"
                                                    size="large"
                                                    allowClear
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </label>
                                <label className="lebel">
                                    <div className="flex items-center mt-3  w-full">
                                        <span className="label-text text-lg w-2/5 ">
                                            ปีการศึกษา
                                        </span>
                                        <div className="w-full">
                                            <Form.Item
                                                name="scholarship_year"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณากรอกปีการศึกษา!',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    allowClear
                                                    placeholder="เลือกปีการศึกษา"
                                                    size="large"
                                                    className="w-full"
                                                >
                                                    <Select.Option selected value="alltype">
                                                        ทุกปีการศึกษา
                                                    </Select.Option>
                                                    <Select.Option value="2566">
                                                        ปีการศึกษา 2566
                                                    </Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </label>
                                <label className="lebel">
                                    <div className="flex items-center mt-3  w-full">
                                        <span className="label-text text-lg  w-2/5">
                                            ระยะเวลาเปิดรับสมัคร
                                        </span>
                                        <div className="w-full">
                                            <Form.Item
                                                name={'date_rang'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณากรอกระยะเวลาเปิดรับสมัคร!',
                                                    },
                                                ]}
                                            >
                                                <DatePicker.RangePicker
                                                    style={{ width: '100%' }}
                                                    format={'DD MMM BBBB'}
                                                    size="large"
                                                    allowClear
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </label>
                                <label className="lebel">
                                    <div className="flex items-center mt-3  w-full">
                                        <span className="label-text text-lg  w-2/5">
                                            ประเภททุนการศึกษา
                                        </span>
                                        <div className="w-full">
                                            <Form.Item
                                                name="scholarship_type_id"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณาเลือกประเภททุน!',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    allowClear
                                                    placeholder="เลือกประเภททุน"
                                                    size="large"
                                                    className="w-full"
                                                >
                                                    <Select.Option selected value="1">
                                                        ทุนภายใน
                                                    </Select.Option>
                                                    <Select.Option value="2">
                                                        ทุนภายนอก
                                                    </Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </label>
                                <label className="lebel">
                                    <div className="flex items-center mt-3  w-full">
                                        <span className="label-text text-lg  w-2/5">
                                            เกรดเฉลี่ยขั้นต่ำ
                                        </span>
                                        <div className="w-full">
                                            <Form.Item
                                                name="scholarship_grade"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณากรอกเกรดเฉลี่ยขั้นต่ำ!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="เกรดเฉลี่ยขั้นต่ำ"
                                                    size="large"
                                                    allowClear
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </label>
                                <label className="lebel">
                                    <div className="flex items-center mt-3 w-full">
                                        <span className="label-text text-lg  w-2/5">ชั้นปี</span>
                                        <div className="w-full">
                                            <Form.Item
                                                name="class_type_id"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณากรอกชั้นปี!',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    allowClear
                                                    placeholder="เลือกชั้นปี"
                                                    size="large"
                                                    className="w-full"
                                                >
                                                    <Select.Option selected value="0">
                                                        ทุกชั้นปี
                                                    </Select.Option>
                                                    <Select.Option value="1">
                                                        เฉพาะชั้นปีที่ 1
                                                    </Select.Option>
                                                    <Select.Option value="2">
                                                        เฉพาะชั้นปีที่ 2
                                                    </Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </label>
                                <label className="lebel">
                                    <div className="flex items-center mt-3 w-full">
                                        <span className="label-text text-lg  w-2/5">แท็กสี</span>
                                        <div className="w-full">
                                            <Form.Item
                                                name={'tag_color'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณาเลือกแท็กสี!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="เลือกแท็กสี"
                                                    onClick={showModal}
                                                />
                                            </Form.Item>

                                            <Modal open={open} footer={null}>
                                                <div>
                                                    <HexColorPicker
                                                        color={color}
                                                        onChange={setColor}
                                                        style={{ width: 300, height: 200 }}
                                                        defaultValue={'#ffffff'}
                                                    />
                                                    <div
                                                        className="value mt-3 inline-block"
                                                        style={{ backgroundColor: color }}
                                                    >
                                                        Current color is {color}
                                                    </div>
                                                    <Button onClick={handleOk}>ตกลง</Button>
                                                    <Button onClick={handleCancel}>ยกเลิก</Button>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </label>
                                <label className="lebel">
                                    <div className="flex items-center mt-3  w-full">
                                        <span className="label-text text-lg  w-2/5">เงื่อนไข</span>
                                        <div className="w-full">
                                            <Form.Item
                                                name="scholarship_condition_name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณากรอกเงื่อนไข!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder="เงื่อนไข"
                                                    size="large"
                                                    allowClear
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </label>
                                {/* <label className="lebel">
                                    <div className="flex items-center mt-3 w-full">
                                        <span className="label-text text-lg  w-2/5">อัปโหลด</span>
                                        <div className="w-full">
                                            <FileUploader
                                                handleChange={handleChange}
                                                name="file"
                                                types={fileTypes}
                                                className="w-full"
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    </div>
                                </label> */}
                                <label className="lebel">
                                    <div className="flex items-center mt-3  w-full">
                                        <span className="label-text text-lg  w-2/5">
                                            รายละเอียดเพิ่มเติม
                                        </span>
                                        <div className="w-full">
                                            <Form.Item name="scholarship_qualification_name">
                                                <Input
                                                    placeholder="รายละเอียดเพิ่มเติม"
                                                    size="large"
                                                    allowClear
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div className="flex justify-center ">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="text-white bg-[#08a479] px-8 py-2 rounded-lg"
                                >
                                    บันทึก
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
