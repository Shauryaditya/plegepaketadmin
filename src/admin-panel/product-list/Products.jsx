import React,{useState,useEffect} from 'react'
import { getToken } from '../../hook/getToken'
import Header from '../../components/Header';
import { ProductTable } from './ProductTable';
import Pagination from '../../components/Pagination';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const token = getToken()
    console.log("Tokenn>>",token)
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const url = `${process.env.REACT_APP_URL}/api/v1/get/all-product`;
               
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setProducts(data.data); // Assuming data is an array of products
                setTotalItems(data.data.length);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProduct();
    }, []);
console.log("Total items:",totalItems)
  return (
    <div className="w-full bg-gray-100 min-h-screen  relative p-2">
        
        <div className="ml-60 max-w-7xl bg-white rounded-lg p-4 top-12 relative">
        <div className="py-4">
          <h1 className="text-xl font-medium text-left">Product list</h1>
          <p className='text-left text-sm '>Manage all your products</p>
        </div>
        <div className="flex flex-col">
   
        <div className=" ">
          <div class="relative overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                <tr>
                  <th scope="col" class="px-2 py-3">
                    Product Name
                  </th>
                  <th scope="col" class="px-2 py-3">
                   Units
                  </th>
                  <th scope="col" class="px-2 py-3">
                   Price
                  </th>
                  <th scope="col" class="px-2 py-3">
                   Qty
                  </th>
                  <th scope="col" class="px-2 py-3">
                   Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                                     products.map((item) => (
                                         <ProductTable
                                             key={item._id}
                                             data={item}
                                             
                                        />
                                     ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={pageSize}
              setCurrentPage={setCurrentPage} 
              />
              </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Products