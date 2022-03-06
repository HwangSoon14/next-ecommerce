import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CustomButton from '../../components/CustomButton';
import CustomQuantity from "../../components/CustomQuantity";
import { addToCart } from "../../store/slice/cartSlice";
import checkAddToCart from "../../utils/checkAddToCart";
import { getData } from "../../utils/fetchData";

const DetailProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const  [valueInput , setValueInput] = useState(1);
  const handleChangeTab = (index) => {
    setTab(index);
  };
  
  const handleAddToCart = () => {
    const isErr = checkAddToCart(product);
    if(isErr !== "") {
      toast.error(isErr, {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }); 
    return;  
  }
    dispatch(addToCart({product , quantity: valueInput}));
    toast.success("Add to cart success" , {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    }
  
  return (
    <div>
      <Head>
        <title>Detail Product</title>
      </Head>
      <Container
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: 'stretch',
          justifyContent: {
            xs: "normal",
            md: "space-between",
          },
          marginTop: "15px",
          padding: {
            xs: '0 15px 20px'
          }
        }}
      >
        <Box
          sx={{
            flexGrow: "1",
            width: {
              xs: "100%",
            },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: "100%", height: {
            xs: 270,
            sm: 360,
            md: 420,
          }, mb: 1 }}>
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: "10px",
              }}
              alt={product.name}
              src={product.images[tab].url}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            {product.images.map((item, idx) => (
              <Box
                key={idx}
                component="img"
                sx={{
                  width: "calc(100%/5 - 6px)",
                  height: {
                    xs: "65px",
                    sm: "75px",
                    md: "80px",
                  },
                  mx: "3px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  cursor: "pointer",
                  border: {
                    xs: tab === idx ? "2px solid #028082" : "none",
                    md: tab === idx ? "3px solid #028082" : "none",
                  },
                }}
                alt={item}
                src={item.url}
                onClick={() => handleChangeTab(idx)}
              ></Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: "1",
            width: {
              xs: "100%",
            },
            ml: {
              md: "15px",
            },
            mt: {
              sx: "30px",
              sm: "20px",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "20px",
                sm: "26px",
                md: "32px",
              },
              mt: {
                xs: "15px",
              },
              fontWeight: "700",
            }}
          >
            {product.name.toUpperCase()}
          </Typography>
          <Typography
            sx={{
              color: "red",
              fontSize: {
                xs: "20px",
                sm: "24px",
              },
              display: "block",
              my: "5px",
            }}
            variant="h6"
          >
            ${product.price}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "red",
                fontSize: {
                  xs: "18px",
                  sm: "22px",
                  fontWeight: "500",
                },
              }}
            >
              {product.inStock > 0
                ? `In Stock: ${product.inStock}`
                : "Out Stock"}
            </Typography>
            <Typography
              sx={{
                color: "red",
                fontSize: {
                  xs: "18px",
                  sm: "22px",
                  fontWeight: "500",
                },
              }}
            >
              Sold: {product.sold}
            </Typography>
          </Box>
          <Typography sx={{mt: '10px', lineHeight: {
              xs: '1.6',
              md: '1.8'
          }}} paragraph>{product.content}</Typography>
          <Typography sx={{mt: '10px', lineHeight: {
              xs: '1.6',
              md: '1.8'
          }}} paragraph>{product.description}</Typography>

          <Box sx={{width: {
            xs: '100%'
          },
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row'
          },
          alignItems: 'center'
          }}>
          <Box sx={{width: {
              xs: '100%'
            },
            m: {
              xs: '5px 0'
            }
            }}>
              <CustomQuantity onChangeValue={setValueInput}/>
            </Box>
            <Box sx={{width: {
              xs: '100%',
              paddingBottom: {
                xs: '20px'
              }
            }}}>
                <CustomButton onClick={handleAddToCart}>BUY</CustomButton>
            </Box>
            
          </Box>
        </Box>
      </Container>
    </div>
  );
};



export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  return {
    props: {
      product: res.product,
    },
  };
}

export default DetailProduct;
