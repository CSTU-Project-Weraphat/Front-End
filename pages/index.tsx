import Image from 'next/image';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { getInfomation } from '@/dataService/getinformation';
import { getScholarship } from '@/dataService/getscholarship';
import Layout2 from '@/components/layout2';
import { getDate } from '@/utils/getDate';
import Fullcalendar from '@/components/fullcalendar';
import dayjs from 'dayjs';
import { Tag } from 'antd';

export default function Index() {
    const useSwiperRef = useRef<SwiperClass>();

    const Router = useRouter();

    const { data: information, isLoading: isLoadingInfo } = useQuery({
        queryKey: 'information',
        queryFn: async () => getInfomation(),
    });

    const { data: scholarship, isLoading: isLoadingScholarship } = useQuery({
        queryKey: 'scholarshipAll',
        queryFn: async () => getScholarship(),
    });

    useEffect(() => {
        console.log(scholarship);
    }, [scholarship]);
    return (
        <Layout2 isLoading={isLoadingInfo && isLoadingScholarship}>
            <div className=" w-full min-h-screen bg-[#EFF1FE]">
                <section id="homepage" className="relative">
                    <img
                        src="https://cdn.discordapp.com/attachments/1153632685407871066/1164514618698371182/Dometu-transformed.png?ex=6628e2c0&is=66279140&hm=9fa1528e363e8b841e1d445aee0b37f7f761bccba463dba4b07d0098acda57b0&"
                        width={600}
                        height={600}
                        className="object-cover brightness-50 w-full min-h-screen lg:min-h-0"
                        alt="Picture of the author"
                    />

                    <div className="flex items-center w-full lg:h-[600px] mx-auto max-w-3xl md:max-w-5xl lg:max-w-7xl absolute inset-0 slide-left">
                        <div className="space-y-3 -translate-y-20 lg:translate-y-0  lg:space-y-6 pl-5 pt-5 pb-10 lg:pl-5 lg:pb-0 lg:pt-0">
                            <div className="font-bold text-white  text-2xl md:text-4xl">
                                ทุนการศึกษาสำหรับนักศึกษา
                            </div>
                            <div className="font-semibold lg:font-bold text-white text-md md:text-2xl ">
                                วิทยาการคอมพิวเตอร์ มหาวิทยาลัยธรรมศาสตร์
                            </div>
                            <div className="mt-10">
                                <button
                                    onClick={() => Router.push('/register')}
                                    className="text-white bg-[#EB9D48]  p-1 lg:p-2 rounded-lg w-[150px] "
                                >
                                    ลงทะเบียน
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="information" className="w-full bg-white pb-10">
                    <div className="mx-auto w-full lg:max-w-7xl pt-20">
                        <div className="font-semibold lg:font-bold text-xl lg:text-2xl text-black text-center">
                            ข่าวประชาสัมพันธ์
                        </div>
                        <div className="pt-12 pr-2 md:flex lg:flex lg:space-x-3 mx-3 lg:mx-0">
                            <div className="hidden lg:flex items-center">
                                <button
                                    onClick={() => useSwiperRef.current?.slidePrev()}
                                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-sky-600 focus:bg-sky-700 my-20"
                                >
                                    <AiOutlineLeft className="h-5 w-5 text-white" />
                                </button>
                            </div>
                            <Swiper
                                modules={[Pagination]}
                                pagination={true}
                                onSwiper={(swiper) => (useSwiperRef.current = swiper)}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                        spaceBetween: 5,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                        spaceBetween: 5,
                                    },
                                }}
                            >
                                {information?.result.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <SwiperSlide>
                                                <div className="relative border shadow-md space-y-5 w-[full] h-[350px] lg:w-[270px]  lg:h-[430px] p-3 rounded-md px-3">
                                                    <img
                                                        src="https://cdn.discordapp.com/attachments/1153632685407871066/1164851487273406484/f006018d74046a40.png?ex=6544b77c&is=6532427c&hm=12a74e75f31ca00e112fbb993cef323a5d4c76bc0330e7911178f09019a4f052&"
                                                        width={100}
                                                        height={50}
                                                        className="object-cover  w-full h-36"
                                                        alt="Picture of the author"
                                                    />

                                                    <div className="font-medium md:text-lg lg:text-xl">
                                                        {item.title}
                                                    </div>
                                                    <div className="font-normal md:text-sm lg:text-md">
                                                        {item.description}
                                                    </div>
                                                    <div className=" font-normal mt-5 md:text-sm lg:text-md">
                                                        วันที่ประกาศ :{' '}
                                                        {dayjs(item.create_date)
                                                            .locale('th')
                                                            .format('DD MMMM BBBB')}
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </div>
                                    );
                                })}
                                <div className="swiper-pagination"></div>
                            </Swiper>
                            <div className="hidden lg:flex items-center">
                                <button
                                    onClick={() => useSwiperRef.current?.slideNext()}
                                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-sky-600 focus:bg-sky-700 my-20"
                                >
                                    <AiOutlineRight className="h-5 w-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="calendar" className="w-full bg-white py-24">
                    <div className="mx-auto  lg:max-w-7xl lg:flex ">
                        <div className="w-full lg:w-2/5 lg:pr-5 ">
                            <div className="flex justify-between items-center ">
                                <div className="font-bold text-md md:text-lg lg:text-xl mx-3">
                                    ทุนการศึกษาที่เปิดรับสมัคร
                                </div>
                                <div
                                    className="text-blue-500 font-medium text-lg hover:underline cursor-pointer mx-3"
                                    onClick={() => Router.push('/scholarshipAll')}
                                >
                                    ทั้งหมด
                                </div>
                            </div>
                            <div className="pt-5 mx-3">
                                {scholarship?.result.map((item, Index) => {
                                    return (
                                        <div
                                            key={Index}
                                            className="border rounded-md shadow-lg mb-3 p-3 mt-3 space-y-3 cursor-pointer hover:bg-slate-50"
                                            onClick={() =>
                                                Router.push(
                                                    `/scholarship-detail/${item.scholarship_id}`,
                                                )
                                            }
                                        >
                                            <div className="font-semibold text-xl text-blue-600 hover:text-blue-500 hover:underline">
                                                {item.scholarship_name}
                                            </div>
                                            <div className="font-normal text-[17px]">
                                                {item.scholarship_type_name === 'ทุนภายใน' ? (
                                                    <Tag color="blue">
                                                        {item.scholarship_type_name}
                                                    </Tag>
                                                ) : (
                                                    <Tag color="red">
                                                        {item.scholarship_type_name}
                                                    </Tag>
                                                )}{' '}
                                                ( ปีการศึกษา {item.scholarship_year})
                                            </div>
                                            <div className="font-normal">
                                                {' '}
                                                เปิดรับสมัคร:{' '}
                                                {getDate(item.start_date, item.end_date)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className=" w-full lg:w-3/5 pt-10 lg:pt-0 pl-7 lg:pl-5 pb-10 -mx-3">
                            <div className="font-bold text-md md:text-lg lg:text-xl pb-5">
                                ปฏิทินกำหนดการ
                            </div>
                            <Fullcalendar />
                        </div>
                    </div>
                </section>

                <section
                    id="scholarship_types"
                    className=" w-full h-[500px] mx-auto max-w-3xl lg:max-w-7xl"
                >
                    <div className="text-center font-bold text-xl lg:text-2xl p-10">ประเภททุน</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                        <div className="h-[150px] md:h-[300px] p-5 border  duration-300 shadow-md bg-white scale-90 hover:scale-100 ease-in ">
                            <div className="max-md:flex">
                                <div className="md:flex md:justify-center">
                                    <Image
                                        src="/โลก.png"
                                        width={150}
                                        height={50}
                                        alt="Picture of the author"
                                    />
                                </div>
                                <div className=" pt-5 space-y-3">
                                    <div className="font-bold text-xl text-center">ทุนภายนอก</div>
                                    <div className="text-center">
                                        ทุนจากหน่วยงาน องค์กร ในประเทศไทย
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[150px] md:h-[300px] p-5 border  duration-300 shadow-md bg-white scale-90 hover:scale-100 ease-in">
                            <div className="max-md:flex ">
                                <div className="md:flex md:justify-center">
                                    <Image
                                        src="/โลก.png"
                                        width={150}
                                        height={50}
                                        alt="Picture of the author"
                                    />
                                </div>
                                <div className=" pt-8 space-y-3">
                                    <div className="font-bold text-xl text-center">ทุนภายใน</div>
                                    <div className="text-center">ทุนจากมหาวิทยาลัยธรรมศาสตร์</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout2>
    );
}
