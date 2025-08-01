import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../apis/axios";
import { useAuthStore } from "../../storages/useAuthStorage";
import type { User } from "../../types/user";

type HospitalRecordItem = {
    hr_id: number;
    user: User;
    datetime: string;
    location: string;
    symptom: string;
    memo: string;
};

const Hospital = ({ selectedDate }: { selectedDate: Date | null }) => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [hrList, setHrList] = useState<HospitalRecordItem[]>([]);

    const formatDate = (date: Date) => {
        return date.toISOString().slice(0, 10); // 'YYYY-MM-DD'
    };

    const parseLocalDate = (dateString: string) => {
        const [year, month, day] = dateString.split('T')[0].split('-').map(Number);
        return new Date(year, month - 1, day); // month는 0부터 시작하므로 -1
    };

    const isSameDate = (date1: Date, date2: Date) => {
        return formatDate(date1) === formatDate(date2);
    };
    console.log("userName:", user?.username);

    useEffect(() => {
        const fetchHr = async () => {
            try {
                const res = await api.get<HospitalRecordItem[]>("/hr");

                if (user) {
                    const filtered = res.data.filter(
                        (item) => item.user.user_id === user.user_id
                    );
                    setHrList(filtered);
                } else {
                    console.warn("로그인된 유저 정보가 없습니다.");
                    setHrList([]);
                }
            } catch (err) {
                console.error("병원 기록 불러오기 실패:", err);
            }
        };

        fetchHr();
    }, [user]);

    return (
        <div>
            <div className="px-2 mt-[65px] flex justify-end">
                <span
                    className="bg-gray-400 px-2 py-1 rounded-md text-white"
                    onClick={() => navigate(`/writehospital`)}
                >
                    글쓰기
                </span>
            </div>
            <div className="max-h-[180px] overflow-y-auto bg-white">
                {hrList
                    .filter(item => {
                        if (!selectedDate) return false;
                        const itemDate = parseLocalDate(item.datetime);
                        return isSameDate(itemDate, selectedDate);
                    })
                    .map((item) => (
                        <div
                            key={item.hr_id}
                            className="flex justify-between items-start py-4 border-b border-gray-200"
                        >
                            <div className="flex-1">
                                <div className="text-base font-bold leading-snug text-lg">
                                    {item.datetime}
                                </div>
                                <div className="text-sm">
                                    병 원 | &nbsp;
                                    {item.location}
                                </div>
                                <div className="text-sm">
                                    검 사 | &nbsp;
                                    {item.symptom}
                                </div>
                                <div className="text-sm">
                                    메 모 | &nbsp;
                                    {item.memo}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Hospital;
