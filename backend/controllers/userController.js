import User from '../models/userModel.js '
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'


//@desc Auth user & get token
//@route POST/api/user/login
//@access public

const authUser= asyncHandler(async(req,res) =>{
  const {email, password}= req.body

const user = await User.findOne({email})

if (user && (await user.matchPassword(password))){
res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token:generateToken(user._id)

})

}else{
    res.status(401)
    throw new Error("invalid email or password")
}
 
})



//@desc register new user
//@route POST/api/user/users
//@access public

const registerUser= asyncHandler(async(req,res) =>{
  const {name ,email, password}= req.body

const userExists  = await User.findOne({email})

if(userExists){
  res.status(400)
  throw new Error("user alerady exists")
}

const user = await User.create({
  name,
  email,
  password
})

if(user){
  res.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token:generateToken(user._id)
  })

}else{
res.status(400)
throw new Error("invalid user data")
}
 
})



//@desc get user profile
//@route GET/api/user/profile
//@access private

const getUserProfile= asyncHandler(async(req,res) =>{
 
const user = await User.findById(req.user._id)

if(user){

  res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
  })

}else{
  res.status(401)
  throw new Error("yser not found")
}

})



//@desc UPDATE user profile
//@route PUT/api/user/profile
//@access private
const updateUserProfile= asyncHandler(async(req,res) =>{
 
  const user = await User.findById(req.user._id)
  
  if(user){
    user.name   = req.body.name  || user.name
    user.email  = req.body.email || user.email

    if (req.body.password) {
      user.password  = req.body.password
  }
  const updatedUser = await user.save()
  res.json({
      _id: updatedUser._id, 
      name: updatedUser.name, 
      email: updatedUser.email, 
      isAdmin: updatedUser.isAdmin,
      token : generateToken(updatedUser._id) 
  })
  
  }else{
    res.status(401)
    throw new Error("yser not found")
  }
  
  })



//@desc get all users
//@route GET/api/users
//@access private/Admin

const getUsers= asyncHandler(async(req,res) =>{
 
const users = await User.find({})

res.json(users)

})

//@desc DELETE user
//@route DELETE/api/users/:id
//@access private/Admin

const deleteUsers= asyncHandler(async(req,res) =>{
const user = await User.findById(req.params.id)
if(user){
  await user.remove()
  res.json({message:'user Removed'})
}else{
  res.status(401)
  throw new Error("user not found")
}


})



//@desc get user by ID
//@route GET/api/users/:id 
//@access private/Admin

const getUserById= asyncHandler(async(req,res) =>{
const user = await User.findById(req.params.id).select('-password') 
if(user){
res.json(user)
}else{
  res.status(401)
  throw new Error("user not found")
}


})


//@desc UPDATE user  
//@route PUT/api/user/:id
//@access private/Admin
const updateUser= asyncHandler(async(req,res) =>{
 
  const user = await User.findById(req.params.id)
  
  if(user){
    user.name   = req.body.name  || user.name
    user.email  = req.body.email || user.email
    user.isAdmin  = req.body.isAdmin || user.isAdmin
    
  const updatedUser = await user.save()
  res.json({
      _id: updatedUser._id, 
      name: updatedUser.name, 
      email: updatedUser.email, 
      isAdmin: updatedUser.isAdmin,
  
  })
  
  }else{
    res.status(401)
    throw new Error("yser not found")
  }
  
  })




export {authUser , getUserProfile , registerUser,updateUserProfile , getUsers , deleteUsers,getUserById, updateUser}