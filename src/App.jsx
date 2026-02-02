import { useState, useRef, useEffect } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


function App() {


  const passRef = useRef()
  const showRef = useRef()
  const siteref = useRef()
  const usernameref=useRef()


  const [form, setform] = useState({ site: "", username: "", password: "",id:uuidv4() })
  const [passwords, setpasswords] = useState([])

  useEffect(() => {




    const password = localStorage.getItem("form")
    if (password) {
      setpasswords(JSON.parse(password))
    }

  }, [])


  const displayText=(count,text) => {
    if(text.length>count){
      return(`${text.slice(0,count)}...`)
    }
    return text;
    
  }
  


  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    const notify = () => toast("Copied To Clipboard!");
    notify();

  }

  const handleEdit=(e,id) => {
    const edit=passwords.find((item)=>{return(item.id===id)})
    if (!edit) return;
    setform(edit)
    handleDelete(e,id);
    siteref.current.value=edit.site;
    usernameref.current.value=edit.username;
    passRef.current.value=edit.password;


    
  }

  const handleDelete=(e,id) => {
    const del=passwords.filter((item)=>{return(item.id!==id)})
    if(!del) return;
    setpasswords(del)
    localStorage.setItem("form", (JSON.stringify([...del])))
    const notify = () => toast("Deleted!");
    notify();
   
    
    
  }
  
  






  const handleShowPassword = () => {
    if (showRef.current.src.includes("/eyecross.png")) {
      showRef.current.src = '/eye.png';
      passRef.current.type = "password"

    } else {
      showRef.current.src = "/eyecross.png"
      passRef.current.type = "text"
    }

  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })

  }

  const addPassword = () => {
    if(form.site.length>3 && form.password.length>3 && form.username.length>3){
      setpasswords([...passwords, form])
      localStorage.setItem("form", (JSON.stringify([...passwords, form])))
      usernameref.current.value=null
      siteref.current.value=null
      passRef.current.value=null
      setform({ site: "", username: "", password: "", id: uuidv4() })
      const notify = () => toast("Password Saved!");
    notify();
    }
  }




  return (
    <>
      <div className="w-full md:w-5/6 h-full justify-self-center bg-gradient-to-r from-gray-900 to-gray-800 top-0 absolute">
        <Navbar />
        <ToastContainer theme='dark' />
        <div className='flex gap-3'>
          <input ref={siteref} onChange={handleChange} value={form.site} className="bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 justify-self-center font-bold w-5/6 m-4" type="text" placeholder="Enter Website URL" name='site'></input>
          <button onClick={addPassword} className='w-24 text-xl text-white font-bold flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl'>Add<lord-icon className=" align-middle"
            src="https://cdn.lordicon.com/gzqofmcx.json"
            trigger="hover"
            colors="primary:#ffffff">
          </lord-icon></button>


        </div>
        <div className="flex-col md:flex-row">
          <input ref={usernameref} value={form.username} onChange={handleChange} className="bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 justify-self-center font-bold w-3/4 m-4" type="text" placeholder="Enter Username" name='username'></input>
          <div className='flex'>
            <input ref={passRef} value={form.password} onChange={handleChange} className="bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 justify-self-center font-bold w-3/4 m-4" type="password" placeholder="Enter Password" name='password'></input>
            <span onClick={handleShowPassword} className='align-middle top-4 right-12  relative cursor-pointer'><img ref={showRef} className='h-7 w-7 filter invert ' src='/eye.png'></img></span>
          </div>





        </div>
        <div className='h-1 bg-gray-700 w-5/6 justify-self-center'></div>

        {passwords.length === 0 && <h1 className='text-2xl text-white text-center m-5 font-semibold'>Password Vault Empty <br />
          Create your first secure entry using the form above to get started.
        </h1>}

        {passwords.length !== 0 && <>
          <div className="w-full overflow-hidden rounded-2xl border border-gray-700 shadow-2xl shadow-black/20 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm">
            <table className="text-xs w-full justify-self-center md:text-sm mb-10">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                  <th className="w-2/5 text-center md:px-6 md:py-4 text-left font-bold text-gray-200 tracking-wide rounded-tl-2xl">Site</th>
                  <th className="md:px-6 md:py-4 text-left font-semibold text-gray-300">Username</th>
                  <th className="md:px-6 md:py-4 text-left font-semibold text-gray-300 rounded-tr-2xl">Password</th>
                  <th className="md:px-6 md:py-4 text-left font-semibold text-gray-300 rounded-tr-2xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {passwords.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="md:px-6 md:py-12 text-center text-gray-500 font-medium">
                      No passwords saved yet. Add your first entry!
                    </td>
                  </tr>
                ) : (
                  passwords.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-700/50 transition-all duration-200 group">
                      <td className=" px-6 py-4 font-medium text-white group-hover:text-blue-400 truncate max-w-[200px]">
                        <div className='flex justify-center  items-center'><a href={entry.site} target='_blank'>{displayText(20,entry.site)}</a><div onClick={() => copyText(entry.site)} className=' filter invert' ><lord-icon
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          trigger="hover">
                        </lord-icon></div>
                        </div>

                      </td>
                      <td className="md:px-6 md:py-4 text-gray-300 truncate max-w-[150px]">
                        <div className='flex  items-center'>
                          <span>{displayText(11,entry.username)}</span><div onClick={() => copyText(entry.username)} className='filter invert '><lord-icon
                            src="https://cdn.lordicon.com/xuoapdes.json"
                            trigger="hover">
                          </lord-icon></div>
                        </div>
                      </td>
                      <td className="md:px-6 md:py-4 flex font-mono text-sm text-gray-200 bg-black/20 px-3 py-2 rounded-xl backdrop-blur-sm">
                        <div className='flex  items-center'>
                          {displayText(10,entry.password)}<div onClick={() => copyText(entry.password)} className=' filter invert '><lord-icon
                            src="https://cdn.lordicon.com/xuoapdes.json"
                            trigger="hover">
                          </lord-icon></div>
                        </div>
                      </td>
                      <td className="md:px-6 md:py-4 font-mono text-sm text-gray-200 bg-black/20 px-3 py-2 rounded-xl backdrop-blur-sm ">
                        <div className='flex md:gap-6'>
                          <div id={entry.id} className='w-3 h-3 md:w-5 md:h-5' onClick={(e)=>handleEdit(e,entry.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/vysppwvq.json"
                            trigger="hover">
                          </lord-icon>
                          </div>
                          <div id={entry.id} className='w-3 h-3 md:w-5 md:h-5' onClick={(e)=>handleDelete(e,entry.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/tftntjtg.json"
                            trigger="hover"></lord-icon>
                            </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>}








        <Footer />

      </div>


    </>
  )
}

export default App
