# CsScholarship เว็บแอปพลิเคชันสำหรับจัดการทุนการศึกษา สาขา วิทยาการคอมพิวเตอร์
# [Demo](https://csscholarship.vercel.app)
**ไอดี Test Demo**

**Username** 6109650124

**Password** 0124

เป็นแอปพลิเคชันที่พัฒนาด้วย React-Typescript

## โครงสร้างโฟลเดอร์

```bash
├── .github
├── components
│    ├── displayItem.tsx
│    ├── fullcalendar.tsx
│    ├── fullcalendarID.tsx
│    ├── layout.tsx
│    └── layout2.tsx
├── dataService
│    ├── deleteinformation.ts
│    ├── deleteScholarship.ts
│    ├── getcalendat.ts
│    ├── getfollowScholarship.ts
│    ├── gethistoryScholarship.ts
│    ├── getinformation.ts
│    ├── getmanageScholarship.ts
│    ├── getscholarhship.ts
│    ├── getScholarshipComing.ts
│    ├── getScholarshipID.ts
│    ├── getScholarshipTypes.ts
│    ├── getStudent.ts
│    ├── getTypeClassName.ts
│    ├── getuserInfo.ts
│    ├── postAlertScholarship.ts
│    ├── postCreateScholarship.ts
│    ├── postInformation.ts
│    ├── postLogin.ts
│    ├── postRegister.ts
│    ├── postSubscribe.ts
│    ├── putInformation.ts
│    ├── putScholarshipID.ts
│    ├── unSubscribe.ts
│    └── updateUserStatus.ts
├── pages
│    ├── addscholarship
│    ├── announcements
│    ├── editscholarship
│    ├── followscholarship
│    ├── login
│    ├── manageScholarship
│    ├── manageStudent
│    ├── pastScholarship
│    ├── register
│    ├── scholarship
│    ├── scholarship-detail
│    ├── scholarshipAll
│    ├── student
│    ├── studentfollow
│    ├── userInformation
│    ├── _app.tsx
│    ├── _document.tsx
│    └── index.tsx
├── public
├── styles
│    ├── globals.css
│    ├── slide-left.css
│    └── testCSS.css
├── utils
│    ├── event.ts
│    ├── getDate.test.ts
│    ├── getDate.ts
│    └── regx.ts
├── .gitignore
├── jest.config.js
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## ขั้นตอนในการติดตั้ง

1. ติดตั้ง node version 18.16.1 ที่นี่ https://nodejs.org/en/blog/release/v18.16.1

2. ติดตั้ง git ผ่าน Command Prompt หรือ Powershell ผ่านคำสั่ง

```
winget install --id Git.Git -e --source winget
```

3. ใช้คำสั่ง git clone เพื่อทำการคัดลอกโปรเจกต์

```
git clone https://github.com/Weraphat-CSTU/project_front.git
```

4. ติดตั้ง node module ผ่านคำสั่ง

```
npm install
```

## วิธีใช้งาน

เมื่อทำการติดตั้งตามขั้นตอนทั้งหมดแล้ว สามารถ run ตามคำสั่งด้านล่างได้เลย

```
npm run dev
```
