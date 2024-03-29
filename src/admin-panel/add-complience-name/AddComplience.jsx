import React,{useState,useEffect} from 'react'
import { getToken } from '../../hook/getToken'
import { ComplienceTable } from './ComplienceTable';
import { AddIcon } from '@chakra-ui/icons';
import AddComplienceModal from '../../components/AddComplienceModal';

const Complience = () => {
    const [complience, setComplience] = useState([]);
    const token = getToken()
    console.log("Tokenn>>",token)
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const url = `${process.env.REACT_APP_URL}/api/v1/get/compilations`;
               
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setComplience(data.data); // Assuming data is an array of products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProduct();
    }, []);

    console.log("Products>>>",complience)
  return (
    <div className="w-full bg-gray-100 min-h-screen  relative p-2">
      
        <div className="ml-60 max-w-7xl  bg-white rounded-lg p-4 top-12 relative">
        <div className="flex justify-between py-4">
            <div className="">
          <h1 className="text-xl font-medium text-left">Complience list</h1>
          <p className='text-left text-sm '>Manage all your compliences</p>
          </div>
          <div className="flex justify-center items-center gap-x-2">
            <AddComplienceModal />
            <p>Add new compliance</p>
          </div>
        </div>
        <div className="flex flex-col">
   
        <div className=" bg-gray-200  ">
          <div class="relative overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                <tr>
                  <th scope="col" class="px-2 py-3">
                   Complience Name
                  </th>
                  <th scope="col" class="px-2 py-3">
                   Complience Id
                  </th>
              
                  <th scope="col" class="px-2 py-3">
                   Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {complience &&
                                     complience.map((item) => (
                                         <ComplienceTable
                                             key={item._id}
                                             data={item}
                                             
                                        />
                                     ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Complience