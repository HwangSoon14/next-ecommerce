import React from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Grid, Typography } from '@mui/material';
import TextInputField from './form-control/TextField';
import TextAreaField from './form-control/TextAreaField';
import SelectField from './form-control/SelectField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CustomButton from './CustomButton'
import { PhotoCamera } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
const schema = yup.object().shape({
    title: yup
      .string()
      .required("Please enter title !"),
    price: yup
      .number()
      .required("Please enter price !")
      .positive("Price must be positive")
      .moreThan(0 , "Price must greater than 0")
      .lessThan(1000000000 , "Price must less than 1.000.000.000")
      .typeError('Please enter a valid number'),
    inStock: yup
    .number()
    .required("Please enter inStock !")
    .positive("In Stock must be positive")
    .integer("In Stock must be integer")
    .typeError('Please enter a valid number'),
    description: yup
    .string()
    .required("Please enter description !"),
    content: yup
    .string()
    .required("Please enter content !"),
    category: yup
    .string()
    .required("Please choose category")

  });
  

const AddEditProductForm = (props) => {
    const { onSubmit , images , setImages , onEdit , product}  = props;
    const categories = useSelector(state => state.categories.categories);
    console.log(product);
    const methods = useForm({
        mode: "onBlur",
        defaultValues:  {  
                title:  product ? product.name : "",
                price: product ? product.price :  "",
                inStock: product ? product.inStock : "",
                description: product ? product.description : "",
                content: product ? product.content : "",
                category: product ? product.category : "",
            },
        resolver: yupResolver(schema),
      });

      const handleUploadInput = (e) => {
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]
        if(files.length  === 0) return toast.error("Files does not exist");
        files.forEach(file => {
            //check img size
            if(file.size > 1024 * 1024) return err = 'The largest image size is 1mb'
            // check type of file
            if(file.type !== 'image/jpeg' && file.type !== 'image/png') return err = 'Image format is incorrect'
            
            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;
        })
        if(err) toast.error(err);

        const imgCount = images.length;
        if(imgCount + newImages.length > 5) return toast.error("Select up to 5 images");
        setImages([...images,...newImages]);
      }
     

      const handleDeleteImage =(idx) => {
        const imageArray = [...images];
        imageArray.splice(idx , 1);
        setImages(imageArray);
    }

      const handleSubmit = async (data) => {
          if(!onSubmit) return;
          onSubmit(data);
      }
    return (
        <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box sx={{width: '100%'}}>
                            <TextInputField name="title" label="Title"/>
                            <Box sx={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'stretch', marginTop :1}}>
                                <Box sx={{width: '48%' }}>
                            <TextInputField name="price" label="Price"/></Box>
                                <Box sx={{width: '48%'}}>
                            <TextInputField name="inStock" label="In stock"/></Box>
                            </Box>
                            <Box sx={{my: 1}}>
                            <Typography sx={{mb: 0.5}}>Description</Typography>
                                <TextAreaField name="description" placeholder="Enter description" minRows={5}/>
                            </Box>

                            <Box sx={{my: 1}}>
                            <Typography sx={{mb: 0.5}}>Content</Typography>
                            <TextAreaField name="content" placeholder="Enter Content" minRows={7}/>
                            </Box>
                            <Box>
                            <SelectField name="category" label="Category" options={categories}/>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box sx={{py: 2, ml: {
                            xs: 0,
                            md :2,
                        }}}>
                            <Box sx={{width: '100%' , border: '2px solid #ccc' , cursor: 'pointer',borderRadius: 2, p: 1.5, ':hover' : {
                                backgroundColor: 'rgba(1,1,1,0.1)',
                                transition: 'background-color 0.25s ease'
                            }}}>
                            <label style={{cursor: 'pointer'}} htmlFor="icon-button-file">
        <input style={{display: 'none'}} multiple accept="image/*" id="icon-button-file" type="file" onChange={handleUploadInput}/>
        <Typography sx={{display: 'flex' , alignItems: 'center', fontWeight: 500 , justifyContent: 'center'}}>UPLOAD <PhotoCamera /></Typography>
      </label>
                            </Box>
                            <Box sx={{display: 'flex', flexWrap: "wrap" , my :2}}>
                                {images.map((image, idx) => (
                                    <Box key={idx} sx={{width: {
                                        xs: idx === 0 ? "100%" : "33.33%" ,
                                        sm: idx === 0 ? "100%" : "25%" 
                                    }, border: '1px solid #ccc',  
                                    height: {
                                        xs: idx === 0 ? 300 : 95,
                                        sm: idx === 0 ? 370 : 100,
                                        md: idx === 0 ? 400 : 100,
                                    }, margin: idx !== 0 ? "0" : "0 0 10px 0", position: 'relative'
                                    }}>
                                        <Box component="img" sx={{width: '100%' , height: '100%' , objectFit: 'cover'}} alt="img" src={image.url ? image.url : URL.createObjectURL(image)}/>
                                        <HighlightOffIcon onClick={() => handleDeleteImage(idx)} htmlColor="#fb4c53" sx={{position: 'absolute', top: 0 , right: 0 , zIndex: 2,cursor: 'pointer'}}/>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{width: 150}}>
                    <CustomButton type="submit">SUBMIT</CustomButton>
                </Box>
          </form>
                </FormProvider>
    );
};

export default AddEditProductForm;