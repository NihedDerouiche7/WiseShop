import bcrypt from 'bcryptjs'

const users =[
    {
        name:'Admin User',
        email:'admin@exemple.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Mohammed Derouiche',
        email:'med@exemple.com',
        password:bcrypt.hashSync('123456',10),
      
    },
    {
        name:'Iheb Derouiche',
        email:'iheb@exemple.com',
        password:bcrypt.hashSync('123456',10),
        
    },
]
export default users