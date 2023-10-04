export type registerPlayload = {
    name: string;
    lastname: string;
    email: string;
    card_id: string;
    student_id: string;
    phone: string;
    line_id: string|null;
    grade: number|null;
    password: string; 
};

export type registerPlayloadRespone = {
    success: boolean;
};

export function postRegister(data: registerPlayload): Promise<registerPlayloadRespone> {
    return Promise.resolve( {success :  true });
}
