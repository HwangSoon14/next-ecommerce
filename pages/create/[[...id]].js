import { Container, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import AddEditProductForm from "../../components/AddEditProductForm";
import LoadingCpn from '../../components/Loading';
import { getData, postData, putData } from "../../utils/fetchData";
import { imageUpload } from '../../utils/imageUpload';

const CreateProduct = () => {
    const [product, setProduct] = useState({})
    const [images, setImages] = useState([])
    const [onEdit , setOnEdit] = useState(false);
    const router = useRouter();
    const {id} = router.query;
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const [loading , setLoading] = useState(false);


   
    useEffect(() => {
        if(id) {
          setOnEdit(true);
            getData(`product/${id[0]}`).then(res => {
              setProduct(res.product);
              setImages(res.product.images);
            })
        }
        else {
          setOnEdit(false);
          setProduct({});
              setImages([]);
        }
      }, [id]);
    


      const onSubmit = async (data) => {
        const {category , content , description , inStock , price , title } = data;
        if(user.role !== 'admin') return toast.error('Authentication is not valid')
        if(images.length === 0) return toast.error("Please upload image about this product");
        setLoading(true);
        let media = []
        const imgNewURL = images.filter(img => !img.url);
        const imgOldURL = images.filter(img => img.url);
        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL);

        if(id) {
            putData(`product/${id[0]}` , {category , content , description , inStock , price , title , images: [...media,...imgOldURL]} , token).then(res => {
                if(res.err) {
                    setLoading(false);
                    return toast.error(res.err);
                }
                setLoading(false);
                return toast.success(res.msg);
            })
        }
        else {
            postData("product" , {category , content , description , inStock , price , title , images: [...media,...imgOldURL]} , token).then(res => {
                if(res.err) {
                    setLoading(false);
                    return toast.error(res.err);
                }
                setLoading(false);
                return toast.success(res.msg);
            })
        }
      }

   

    if(user.role !== "admin") return null;
    return (
        <div>
            <Head>
                <title>Product Management</title>
            </Head>
            <Container sx={{py: 2}}>
                <Typography sx={{textAlign: 'center', fontWeight: 500, my: 2, fontSize: {
                    xs: 22,
                    sm: 26,
                    md: 28,
                }}}>PRODUCT MANAGEMENT</Typography>
                <AddEditProductForm onSubmit={onSubmit} images={images} setImages={setImages} product={product} onEdit={onEdit}/>
            {loading && <LoadingCpn />}
            </Container>
        </div>
    );
};

export default CreateProduct;