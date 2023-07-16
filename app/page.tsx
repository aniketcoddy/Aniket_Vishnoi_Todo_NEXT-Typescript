
'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

// Define the Item interface to represent a single item in the Todo list, with id and name properties.
interface Item {
  id: string;
  name: string;
}

// Function to get the items from localStorage
const getLocalItems = (): Item[] | (()=> Item[]) => { 
  // Check if running on the client-side 
  if (typeof window !== 'undefined') {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list")!) as Item[];
  }
}
   else {
    return [];
   }
    // Return an empty function if localStorage is not available
   return()=>[]
};


export default function Home() {
  const [value, setValue] = useState<string>("");
  const [add, setAdd] = useState<Item[]>(getLocalItems());
  const [toggle, setToggle] = useState<boolean>(true);
  const [editItem, setEdititem] = useState<string | null>(null);

  // Handle input change
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };


  // Add or edit an item
  const addData = () => {
    if (!value) {
      alert("Please Enter the data");
    } else if (value && !toggle) {
      setAdd((prevAdd) =>
        prevAdd.map((elem) => {
          if (elem.id === editItem) {
            return { ...elem, name: value };
          }
          return elem;
        })
      );
      setValue("");
      setToggle(true);
      setEdititem(null);
    } else {
      const dataWithId: Item = {
        id: new Date().getTime().toString(),
        name: value,
      };
      setAdd((prevAdd) => [...prevAdd, dataWithId]);
      setValue("");
    }
  };

  // Delete an item function
  const deleteItem = (index: string) => {
    const updateItems = add.filter((elem) => index !== elem.id);
    setAdd(updateItems);
  };

  // Edit an item function
  const editItems = (ind: string) => {
    const editItem = add.find((elem) => elem.id === ind);
    if (editItem) {
      setValue(editItem.name);
      setToggle(false);
      setEdititem(ind);
    }
  };

  // Update localStorage when 'add' state changes
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(add));
  }, [add]);


    
  return (
    <div>
      <div>
        <div className="flex gap-3 xm:gap-2 ">
          <input className="border-solid pl-4 pr-4 shadow-md font-[Inter] font-medium text-base opacity-100 bg-[#262626d9]
           text-[#dedede] border-[#262626d9] border-2 w-[566px] md:w-96 sm:w-80 xs:w-60 xm:w-52 rounded-md" value={value} onChange={handleOnChange}/>
          <a className="flex justify-center items-center p-2  px-8 sm:px-5 bg-[#3aa1ddd6] bg-opacity-100 rounded-md hover:cursor-pointer">
           
            {/* Toggle between 'Add' and 'Edit' based on the 'toggle' state */}
           {toggle ? ( 
            <h1 className="font-roboto font-medium text-560 text-[Inter] text-[#fffefe] text-20" onClick={addData} >
              Add
            </h1>
           ):(
            <h1 className="font-roboto font-medium text-560 text-[Inter] text-[#fffefe] text-20" onClick={addData}>
                  Edit
                </h1> 
                )} 
          </a>
        </div>
      </div>


      <div className="  flex flex-col gap-3 xxs:gap-2 xm:gap-1 mt-20 xxs:mt-14 ">
        {/* Render the list of items */}
        {add.map((element)=>{
          return(
            <div className=" flex border-solid pl-4 pr-4 items-center shadow-md font-[Inter] font-medium text-base bg-[#262626d9] text-[#dedede]
             border-[#262626d9] border-2 w-[666px] md:w-[484px] sm:w-96 xs:w-80 xm:w-72 rounded-md" key={element.id}  >
              <h1 className="break-all w-[544px] p-3 md:w-[375px] sm:w-72 xs:w-56 sm:text-sm xs:text-xs xm:w-48 ">{element.name}</h1>
              <div className="flex gap-2 pl-6">
                {/* Delete button */}
                <a>
                  <Image
                    alt="Delete"
                    src="/img/delete.png"
                    className="w-5 h-5 xs:w-4 xs:h-4"
                    width={100}
                    height={100}
                    onClick={()=>deleteItem(element.id)}
                  />
                </a>
                {/* Edit button */}
                <a>
                  <Image alt="Edit" src="/img/edit.png" width={100} height={100} className="w-5 h-5 xs:w-4 xs:h-4" onClick={()=>editItems(element.id)} />
                </a>
              </div>
            </div> 
           )})} 
      </div>
    </div>
  );
}
