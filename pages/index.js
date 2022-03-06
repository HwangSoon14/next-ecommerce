import { Button, Checkbox, Container, Pagination, Stack } from "@mui/material";
import Head from "next/head";
import { useState , useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import ProductList from "../components/product/ProductList";
import { getData } from "../utils/fetchData";
import filterSearch from "../utils/filterSearch";
import CustomModal from '../components/CustomModal'
import LoadingCpn from '../components/Loading'
import {toast} from 'react-toastify'
import {deleteData} from '../utils/fetchData'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from "@mui/system";
import EmptyProduct from '../components/EmptyProduct'
import { useRouter } from "next/router";
import SearchInput from "../components/SearchInput";
import Filters from "../components/Filters";


export default function Home(props) {
  const { products, totalCount } = props;
  const [listProduct, setListProduct] = useState(products);
  const token = useSelector(state => state.user.token)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  const [idOfProduct , setIdOfProduct] = useState(null)
  const [visibleModal , setVisibleModal] = useState(false);
  const [visibleModalDeleteAll , setVisibleModalDeleteAll] = useState(false);
  const [loading , setLoading] = useState(false);
  const [isCheck , setIsCheck] = useState(false);
  const [page , setPage] = useState(1);
  const [filters , setFilters] = useState({
    page: 1,
    limit: 6,
    category: 'all',
    sort: '',
    search: 'all',
  })

  const router = useRouter();
  console.log(totalCount);
  const handleOpenModal = (id) =>  {
    setIdOfProduct(id);
    setVisibleModal(true) 
  }

  const handleOpenModalDeleteAll = () => {
    setVisibleModalDeleteAll(true);
  }

  const handleDeleteProduct = () => {
      setLoading(true);
      deleteData(`product/${idOfProduct}`, token).then(res => {
        if(res.err) {
          setLoading(false);
          return toast.error(res.err)
        }
        setLoading(false);
        return toast.success(res.msg)
      })

      setLoading(false);
  }
  
  const handleCheckAll = () => {
      const arr = [...listProduct];
      arr.map(x => x.checked = !isCheck);
      setListProduct(arr);
      setIsCheck(!isCheck);
  }

  const handleCheckItem = (id) => {
    const arr = [...listProduct];
    const index = arr.findIndex(x => x._id === id);
    if(index >= 0) {
      arr[index].checked = !arr[index].checked;
    }

    setListProduct(arr);
  }

  const handleDeleteProductByChecked = () => {
    setLoading(true);
    let num = 0;
    listProduct.map(product => {
      if(!product.checked) {
        num += 1;
      }
    })
    if(num === listProduct.length) 
    {
      setLoading(false) 
      return toast.error("Please select product need to remove");
    }

    listProduct.map((product) => {
      if(product.checked) {
        deleteData(`product/${product._id}`, token).then(res => {
          if(res.err) {
            setLoading(false);
            return toast.error(res.err)
          }
        })
      }
    })
    setLoading(false);
    return toast.success("Delete product success");
  }

  const handleChangePage = (e, value) => {
    setPage(value);
    setFilters({
      ...filters,
      page: value,
    })
  }
  
  useEffect(() => {
    filterSearch({router, ...filters});
  } , [filters])
  

  useEffect(() => {
    setListProduct(products);
  }, [products])
  

  if(listProduct.length === 0) return <EmptyProduct />
  return (
    <div>
      <Head>

        <title>Home Page</title>
      </Head>
      <Container>
        <Filters filters={filters} setFilters={setFilters} setPage={setPage}/>
        {user.role === "admin" && <Box sx={{m: "30px 15px 0" , position: 'relative'}}>
        <Checkbox sx={{ position: 'absolute' , zIndex: 2, 
          color: 'white'}} color="error" checked={isCheck} onChange={handleCheckAll}/>
        <Button onClick={handleOpenModalDeleteAll} variant="contained" color="secondary" endIcon={<DeleteOutlineIcon />} sx={{p: "10px 10px 10px 40px"}}>
        DELETE/ALL
      </Button>
        </Box>}
        <ProductList listProduct={listProduct} handleOpenModal={handleOpenModal} handleCheckItem={handleCheckItem}/>
        <CustomModal open={visibleModal} setOpen={setVisibleModal} onConfirm={handleDeleteProduct}/>
        <CustomModal title="This product will be remove , are you sure ?" open={visibleModalDeleteAll} setOpen={setVisibleModalDeleteAll} onConfirm={handleDeleteProductByChecked}/>
        <Stack spacing={2} sx={{display: 'flex' , alignItems: 'center' , justifyContent: 'center' , pb : 2}}>
        <Pagination color="primary" size="large" count={Math.ceil(totalCount / 6)} page={page} onChange={handleChangePage} />
      </Stack>
        {loading && <LoadingCpn />}
      </Container>
    </div>
  );
}
export async function getServerSideProps({query}) {

  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'
  
  const res = await getData(`product?limit=${6}&category=${category}&sort=${sort}&name=${search}&page=${page}`);
  return {
    props: {
      products: res.products,
      totalCount: res.totalCount,
    },
  };
}
