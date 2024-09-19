import React, { useEffect, useState } from 'react';
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';
import { useSelector } from 'react-redux';

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);

  // Define the allowed categories
  const allowedCategories = ['vegetable', 'fruits', 'rice'];

  // Define the product names to exclude
  const excludeProductNames = ['orange', 'apple','fried rice','kakas rice chinese','mango','custard apple','papaya','red capsicum','carrat','paneer']; // Add more names as needed

  // Filter the products based on the allowed categories and exclude the specified products
  const filteredProductData = productData.filter(el =>
    allowedCategories.includes(el.category.toLowerCase()) &&
    !excludeProductNames.includes(el.name.toLowerCase())
  );

  // Create a list of unique categories from the filtered data
  const categoryList = [...new Set(filteredProductData.map((el) => el.category))];

  // State to manage the currently selected category for filtering
  const [filterby, setFilterBy] = useState('');
  const [dataFilter, setDataFilter] = useState(filteredProductData);

  // Update the filtered products whenever the selected category changes
  useEffect(() => {
    if (filterby) {
      const filteredData = filteredProductData.filter(el =>
        el.category.toLowerCase() === filterby.toLowerCase()
      );
      setDataFilter(filteredData);
    } else {
      setDataFilter(filteredProductData);
    }
  }, [filterby, filteredProductData]);

  // Handle category filter click
  const handleFilterProduct = (category) => {
    setFilterBy(category);
  };

  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl text-slate-800 mb-4'>{heading}</h2>
      <div className='flex gap-4 justify-center overflow-scroll scrollbar-none scroll-smooth transition-all'>
        {categoryList.map((category) => (
          <FilterProduct
            key={category}
            category={category}
            isActive={category.toLowerCase() === filterby.toLowerCase()}
            onClick={() => handleFilterProduct(category)}
          />
        ))}
      </div>
      <div className='flex flex-wrap justify-center gap-4'>
        {dataFilter.length ? (
          dataFilter.map((product) => (
            <CardFeature
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              category={product.category}
              price={product.price}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default AllProduct;


// import React, { useEffect, useState } from 'react';
// import FilterProduct from './FilterProduct';
// import CardFeature from './CardFeature';
// import { useSelector } from 'react-redux';

// const AllProduct = ({ heading }) => {
//   const productData = useSelector((state) => state.product.productList);
  
//   // Define the allowed categories
//   const allowedCategories = ['vegetable', 'fruits', 'rice'];
  
//   // Filter the products based on the allowed categories
//   const filteredProductData = productData.filter(el =>
//     allowedCategories.includes(el.category.toLowerCase())
//   );

//   const categoryList = [...new Set(filteredProductData.map((el) => el.category))];
//   const [filterby, setFilterBy] = useState('');
//   const [dataFilter, setDataFilter] = useState(filteredProductData);

//   useEffect(() => {
//     if (filterby) {
//       const filteredData = filteredProductData.filter(el => 
//         el.category.toLowerCase() === filterby.toLowerCase()
//       );
//       setDataFilter(filteredData);
//     } else {
//       setDataFilter(filteredProductData);
//     }
//   }, [filterby, filteredProductData]);

//   const handleFilterProduct = (category) => {
//     setFilterBy(category);
//   };

//   return (
//     <div className='my-5'>
//       <h2 className='font-bold text-2xl text-slate-800 mb-4'>{heading}</h2>
//       <div className='flex gap-4 justify-center overflow-scroll scrollbar-none scroll-smooth transition-all'>
//         {categoryList.map((category) => (
//           <FilterProduct 
//             key={category} 
//             category={category} 
//             isActive={category.toLowerCase() === filterby.toLowerCase()}
//             onClick={() => handleFilterProduct(category)} 
//           />
//         ))}
//       </div>
//       <div className='flex flex-wrap justify-center gap-4'>
//         {dataFilter.map((product) => (
//           <CardFeature
//             key={product._id}
//             id={product._id}
//             image={product.image}
//             name={product.name}
//             category={product.category}
//             price={product.price}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllProduct;

// import React, { useEffect, useState } from 'react';
// import FilterProduct from './FilterProduct';
// import CardFeature from './CardFeature';
// import { useSelector } from 'react-redux';

// const AllProduct = ({ heading }) => {
//   const productData = useSelector((state) => state.product.productList);

//   // Ensure allowed categories are all lowercase
//   const allowedCategories = ['vegetable', 'fruits', 'rice'];

//   // Filter the products to only include items in the allowed categories
//   const filteredProductData = productData.filter(el =>
//     allowedCategories.includes(el.category.toLowerCase())
//   );

//   const categoryList = [...new Set(filteredProductData.map((el) => el.category))];
//   console.log(categoryList);

//   // Filter data display
//   const [filterby, setFilterBy] = useState('');
//   const [dataFilter, setDataFilter] = useState([]);

//   useEffect(() => {
//     setDataFilter(filteredProductData);
//   }, [filteredProductData]);

//   const handleFilterProduct = (category) => {
//     setFilterBy(category);
//     const filter = filteredProductData.filter(
//       (el) => el.category.toLowerCase() === category.toLowerCase()
//     );
//     setDataFilter(() => {
//       return [...filter];
//     });
//   };

//   const loadingArrayFeature = new Array(10).fill(null);

//   return (
//     <div className='my-5'>
//       <h2 className='font-bold text-2xl text-slate-800 mb-4'>{heading}</h2>
//       <div className='flex gap-4 justify-center overflow-scroll scrollbar-none scroll-smooth transition-all'>
//         {categoryList[0] ? (
//           categoryList.map((el) => {
//             return (
//               <FilterProduct
//                 category={el}
//                 key={el}
//                 isActive={el.toLowerCase() === filterby.toLowerCase()}
//                 onClick={() => handleFilterProduct(el)}
//               />
//             );
//           })
//         ) : (
//           <div className='min-h-[150px] flex justify-center items-center'>
//             <p>loading...</p>
//           </div>
//         )}
//       </div>
//       <div className='flex flex-wrap justify-center gap-4 '>
//         {dataFilter[0] ? (
//           dataFilter.map((el) => {
//             return (
//               <CardFeature
//                 key={el._id}
//                 id={el._id}
//                 image={el.image}
//                 name={el.name}
//                 category={el.category}
//                 price={el.price}
//               />
//             );
//           })
//         ) : (
//           loadingArrayFeature.map((el, index) => <CardFeature key={index} loading={'loading...'} />)
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllProduct;


// import React, { useEffect, useState } from 'react'
// import FilterProduct from './FilterProduct'
// import CardFeature from './CardFeature'
// import { useSelector } from 'react-redux'

// const AllProduct = ({heading}) => {

//     const productData = useSelector((state) =>state.product.productList)
//     const categoryList = [...new Set(productData.map(el =>el.category))]
//   console.log(categoryList)

//     //filter data display
//     const [filterby,setFilterBy] = useState("")
//     const [dataFilter,setDataFilter] = useState([])
//     useEffect(()=>{
//       setDataFilter(productData)
//     },[productData])
  
//     const handleFilterProduct = (category)=>{
//       setFilterBy(category)
//       const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
//       setDataFilter(()=>{
//         return[
//           ...filter
//         ]
//       })
  
//     }
//     const loadingArrayFeature = new Array(10).fill(null)

//   return (
//     <div className='my-5'>
//     <h2 className='font-bold text-2xl text-slate-800 mb-4'>{heading}</h2>
//     <div className='flex gap-4 justify-center overflow-scroll scrollbar-none scroll-smooth transition-all'>
//       {
//         categoryList[0] ? categoryList.map(el =>{
//           return (
//             <FilterProduct 
//             category={el}
//             key={el}
//             isActive = {el.toLowerCase() === filterby.toLowerCase()} 
//             onClick={()=> handleFilterProduct(el)}/>
//           );
//         })
//         :
//         <div className='min-h-[150px] flex justify-center items-center'>
//           <p>loading...</p>
//         </div>
//       }

//   </div>
//   <div className='flex flex-wrap justify-center gap-4 '>
//       {
//         dataFilter[0] ? dataFilter.map(el => {
//           return(
//             <CardFeature
//               key = {el._id}
//               id = {el._id}
//               image = {el.image}
//               name = {el.name}
//               category = {el.category}
//               price={el.price}
//             />
//           )
//         })
//         :
//         loadingArrayFeature.map(el => <CardFeature
//           loading = {"loading..."}
//         />)
//       }
//   </div>



//   </div>
//   )
// }

// export default AllProduct