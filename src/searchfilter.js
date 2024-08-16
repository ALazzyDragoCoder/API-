import React, {useEffect, useState} from "react";

export default function Searchfilter() {
    const [data, setData] = useState([]);
    const [searchApiData, setSearchApiData] = useState([]);
    const [filterVal, setFilterVal] = useState('');
    useEffect(() => {
        const fetchData=()=> {
            fetch('https://jsonplaceholder.typicode.com/users')
                  .then(response => response.json())
                  .then(json => {
                    setData(json);
                    setSearchApiData(json);
                  })

        }
        fetchData();
    }, [])

    const handleFilter=(e)=>{
        if(e.target.value == '') {
            setData(searchApiData)
        } else {
            const filterResult = searchApiData.filter(item => item.username.toLowerCase().includes(e.target.value.toLowerCase()) || item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.email.toLowerCase().includes(e.target.value.toLowerCase()) || item.phone.toLowerCase().includes(e.target.value.toLowerCase()));
            if(filterResult.length > 0) {
                setData(filterResult)
            } else {
                setData([{"name":"Boomiya nahi ho raha app Gyan h wo bhi nobita wale"}]);
            }
        }
        setFilterVal(e.target.value)
    }


    return (
        <div style={{margin:'20px 20%'}}>
            <div className='p-input-icon-right'>
                <input type='search' placeholder='Search' value={filterVal} onInput={(e)=>handleFilter(e)}/>
            </div>
            <table>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone</th>
                {
                      data.map(item => {   //row ka sara data as a object save as a local storage array of storage // onclick
                        return(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                        )
                      })
                }
            </table>
        </div>
    )
}