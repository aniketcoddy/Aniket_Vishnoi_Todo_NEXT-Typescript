
'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
}

const getLocalItems = (): Item[] => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list")!) as Item[];
  } else {
    return [];
  }
};

export default function Home() {
  const [value, setValue] = useState<string>("");
  const [add, setAdd] = useState<Item[]>(getLocalItems());
  const [toggle, setToggle] = useState<boolean>(true);
  const [editItem, setEdititem] = useState<string | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

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

  const deleteItem = (index: string) => {
    const updateItems = add.filter((elem) => index !== elem.id);
    setAdd(updateItems);
  };

  const editItems = (ind: string) => {
    const editItem = add.find((elem) => elem.id === ind);
    if (editItem) {
      setValue(editItem.name);
      setToggle(false);
      setEdititem(ind);
    }
  };

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
        {add.map((element)=>{
          return(
            <div className=" flex border-solid pl-4 pr-4 items-center shadow-md font-[Inter] font-medium text-base bg-[#262626d9] text-[#dedede]
             border-[#262626d9] border-2 w-[666px] md:w-[484px] sm:w-96 xs:w-80 xm:w-72 rounded-md" key={element.id}  >
              <h1 className="break-all w-[544px] p-3 md:w-[375px] sm:w-72 xs:w-56 sm:text-sm xs:text-xs xm:w-48 ">{element.name}</h1>
              <div className="flex gap-2 pl-6">
                <a>
                  <Image
                  alt="Delete"
                    src="..\img\delete.png"
                    className="w-5 h-5 xs:w-4 xs:h-4"
                    onClick={()=>deleteItem(element.id)}
                  />
                </a>
                <a>
                  <Image alt="Edit" src="..\img\edit.png" className="w-5 h-5 xs:w-4 xs:h-4" onClick={()=>editItems(element.id)} />
                </a>
              </div>
            </div> 
           )})} 
      </div>
    </div>
  );
}
