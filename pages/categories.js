import { Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {postData , deleteData, putData} from '../utils/fetchData'
import LoadingCpn from '../components/Loading'
import { addCategories , removeCategory, updateCategory } from '../store/slice/categoriesSlice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import CustomModal from '../components/CustomModal'
const Categories = () => {
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const [loading , setLoading] = useState(false)
    const categories = useSelector(state => state.categories.categories)
    const [name , setName] = useState("");
    const [visibleModalConfirm , setVisibleModalConfirm] = useState(false);
    const [category , setCategory] = useState({})
    const [categoryUpdate , setCategoryUpdate] = useState("")
    const handleOpenModalConfirm = (cate) => {
        setCategory(cate)
        setVisibleModalConfirm(true);
    }
    const handleDeleteCategory = () => {
        setLoading(true)
        deleteData(`categories/${category._id}` , token).then(res => {
            if(res.err) {
        setLoading(false)
        return toast.error(res.err)
    } 
        dispatch(removeCategory({id: category._id}))
    toast.success(res.msg);
    setLoading(false);
    setCategoryUpdate({})
        })
    }

    const createCategory = () => {
        if(name.length === 0) return toast.error("Category name is required");
        setLoading(true)

        if(categoryUpdate._id) {
            if(categoryUpdate.name === name) {
                setLoading(false)
                return toast.error("Nothing change , please enter a new name")
            } 
            putData(`categories/${categoryUpdate._id}`, {name} , token).then(res => {
                if(res.err) 
            {
               setLoading(false)
               return toast.error(res.err)
        }
        dispatch(updateCategory({category: res.category}));
            toast.success(res.msg);
            setLoading(false)
            })
            setCategoryUpdate({})
            setName("")
        }else {
            postData("categories" , {name} , token).then(res => {
                if(res.err) 
                {
                   setLoading(false)
                   return toast.error(res.err)
            }
                dispatch(addCategories({newCategory: res.newCategory}));
                toast.success(res.msg);
                setLoading(false)
                 setName("")
            })
        }
    }



    if(user.role !== "admin") return null;
    return (
        <Container>
           <Box sx={{w: '100%', py: 2, my: 1 , textAlign: 'center'}}>
               <Typography sx={{fontSize: {
                   xs: 22,
                   sm: 26,
                   md: 28
               } , fontWeight: 500}}>CATEGORIES MANAGEMENT</Typography>
           </Box>
           <Box sx={{display: 'flex',alignItem: 'center',p: 2 ,width: {
               xs: '100%',
               sm: 400
           }, mx: 'auto'}}>
               <TextField value={name} onChange={e => setName(e.target.value)} sx={{flexGrow: 1}} variant="standard" placeholder='Category name'/>
               <Button onClick={createCategory} sx={{ml: 2}} variant="contained">{categoryUpdate._id ? "Update" : "Create"}</Button>
           </Box>
           <Box sx={{ width: {
               xs: '100%',
               sm: 400
           },display: 'flex', alignItems: 'center', flexDirection: 'column', mx: 'auto', mt: 2}}>
               {categories.map((ct , idx) => (
                   <Box key={idx} sx={{boxShadow: 3, width: '100%', p: 2 , my: 1, borderRadius: 2 , display: 'flex' , alignItems: 'center' , justifyContent: 'space-between'}}>
                       <Typography sx={{fontWeight: 500}}>{ct.name}</Typography>
                       <Box sx={{display: 'flex' , alignItems: 'center' ,justifyContent: 'space-between'}}>
                           <IconButton onClick={() => {
                               setCategoryUpdate(ct);
                               setName(ct.name);
                           }}>
                               <EditIcon htmlColor='black'/>
                           </IconButton>
                           <IconButton onClick={() => handleOpenModalConfirm(ct)}>
                               <DeleteOutlineIcon htmlColor="#fb4c53"/>
                           </IconButton>
                       </Box>
                   </Box>
               ))}
           </Box>
           {loading && <LoadingCpn />}
           <CustomModal open={visibleModalConfirm} setOpen={setVisibleModalConfirm} onConfirm={handleDeleteCategory}/>
        </Container>
    );
};

export default Categories;