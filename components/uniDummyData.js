export const universities = [
    {
        title: 'Fast Lahore',
        admissions: 'open',
        city: 'Lahore',
        fee: '200000',
        ranking: '1',
        status: true,
        type: 'all',
        address: '1.5 KM Defence Rd, off Raiwand Road, Lda Avenue Phase 1, Lahore, Punjab 54000',
        web: 'cuilahore.edu.pk',
        deadline: '20-08-2024',
        contact: '0429912345',
        merit: 50,
        info: 'fast@gmail.com',
    },
    {
        title: 'Comsats Isl',
        admissions: 'open',
        city: 'Islamabad',
        fee: '150000',
        ranking: '2',
        status: true,
        type: 'all',
        address: 'Islamabad Address',
        web: 'lahore.comsats.edu.pk',
        deadline: '20-08-2024',
        contact: '0429912345',
        merit: 50,
        info: 'cui@gmail.com',
    },
    {
        title: 'comsats',
        admissions: 'open',
        city: 'Lahore',
        fee: '200000',
        ranking: '1',
        status: true,
        type: 'all',
        address: '1.5 KM Defence Rd, off Raiwand Road, Lda Avenue Phase 1, Lahore, Punjab 54000',
        web: 'cuilahore.edu.pk',
        deadline: '20-08-2024',
        contact: '0429912345',
        merit: 50,
        info: 'fast@gmail.com',
    },
    {
        title: 'bahria university',
        admissions: 'open',
        city: 'Islamabad',
        fee: '200000',
        ranking: '1',
        status: true,
        type: 'all',
        address: '1.5 KM Defence Rd, off Raiwand Road, Lda Avenue Phase 1, Lahore, Punjab 54000',
        web: 'cuilahore.edu.pk',
        deadline: '20-08-2024',
        contact: '0429912345',
        merit: 50,
        info: 'fast@gmail.com',
    },
];

export const sectionedUniversities = [
    {
        title: 'Lahore',
        data: universities.filter(uni => uni.city === 'Lahore')
    },
    {
        title: 'Islamabad',
        data: universities.filter(uni => uni.city === 'Islamabad')
    },
];

// export const DATA = [
//     {
//         title: 'Main dishes',
//         data: ['Pizza', 'Burger', 'Risotto'],
//     },
//     {
//         title: 'Sides',
//         data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
//     },
//     {
//         title: 'Drinks',
//         data: ['Water', 'Coke', 'Beer'],
//     },
//     {
//         title: 'Desserts',
//         data: ['Cheese Cake', 'Ice Cream'],
//     },
// ];
