import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";


function VendorForm() {
  const { userData, setUserData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    address1: '',
    address2: '',
    company_name: '',
    company_email: '',
    domain_name: '',
    company_country: '',
    company_state: '',
    company_city: '',
    company_code: '',
    company_address1: '',
    company_address2: '',
    admin_email: '',
    admin_password: '',
    skills: [],
    date: '',
    color: '',
    month: '',
    gender: '',
    datetime: '',
    week: '',
    url: '',
  });

  const [formDataerr, setFormDataErr] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    address1: '',
    address2: '',
    company_name: '',
    company_email: '',
    domain_name: '',
    company_country: '',
    company_state: '',
    company_city: '',
    company_code: '',
    company_address1: '',
    company_address2: '',
    admin_email: '',
    admin_password: '',
    skills: "",
    date: '',
    color: '',
    month: '',
    gender: '',
    datetime: '',
    week: '',
    url: '',
  });

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("setData", JSON.stringify(userData));
    console.log(userData);
  }, [userData])

  function handleSubmit(e) {
    e.preventDefault();
    let error = {};
    Object.keys(formData).forEach((key) => {
      const errormsg = validateField(key, formData[key]);
      if (errormsg) {
        error[key] = errormsg;
      }
    });
    setFormDataErr(error);


    if (Object.keys(error).length === 0) {
      const result = userData.find((item) => item.admin_email === formData.admin_email);
      console.log("result", result);

      if (result) {
        alert("Email alrady exist");
      } else {
        const updateData = [...userData, formData];
        setUserData(updateData);
        alert("form submitted Successfully.")
        navigate("/login");
      }

    }
  }

  function validateField(name, value) {
    if (Array.isArray(value)) {
      return value.length === 0
        ? `${name} is required`
        : "";
    }
    if (value.trim() === "") {
      return `${name.replace("_", " ")} is required`;
    }

    if (name.includes("email")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter valid email";
      }
    }

    if (name === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        return "Please enter valid phone number";
      }
    }
    return "";

  }


  function handleChange(e) {
    // e.preventDefault();
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      let updateSkills = [...(formData.skills || [])];
      // console.log(updateSkills);
      if (checked) {
        updateSkills.push(value);
      } else {
        updateSkills = updateSkills.filter((item) => item !== value);
      }

      setFormData({ ...formData, skills: updateSkills });
      setFormDataErr({ ...formDataerr, skills: validateField("skills", updateSkills) });
      //  updateSkills.length === 0 ? "Select at least one skill" : "" 
    } else {
      let cleanedValue = value.trimStart();
      if (name === "phone") {
        cleanedValue = cleanedValue.replace(/\D/g, "");
      }
      setFormData({ ...formData, [name]: cleanedValue });
      // console.log(formData);
      // setUserData(formData);
      //  console.log(data);

      setFormDataErr({
        ...formDataerr, [name]: validateField(name, cleanedValue)
      });
    }
  }


  return (
    <div className="max-w-[900px] mx-auto my-8 p-8 bg-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="bg-gray-100 p-3 rounded-lg text-xl font-semibold mb-5">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 font-semibold">Full Name<span className="text-red-500">*</span></label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name="name" value={formData.name} placeholder="Enter Your Name" onChange={handleChange} />
            {formDataerr.name && (<span className="text-red-500 text-sm mt-1">{formDataerr.name}</span>)}</div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Email<span className="text-red-500">*</span></label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name="email" value={formData.email} placeholder="Enter Your Email" onChange={handleChange} />
            {formDataerr.email && (<span className="text-red-500 text-sm mt-1">{formDataerr.email}</span>)}</div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Phone Number<span className="text-red-500">*</span></label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name="phone" maxLength="10" value={formData.phone} placeholder="Enter Your Number" onChange={handleChange} />
            {formDataerr.phone && (<span className="text-red-500 text-sm mt-1">{formDataerr.phone}</span>)}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Country<span className="text-red-500">*</span></label>
            <select name="country" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" value={formData.country} onChange={handleChange}>
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
            {formDataerr.country && (<span className="text-red-500 text-sm mt-1">{formDataerr.country}</span>)}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">State<span className="text-red-500">*</span></label>
            <select name="state" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" value={formData.state} onChange={handleChange}>
              <option>Select State</option>
              <option value="Gujrat">Gujrat</option>
              <option value="Maharashrta">Maharashrta</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Delhi">Delhi</option>
              <option value="Punjab">Punjab</option>
            </select>
            {formDataerr.state && (<span className="text-red-500 text-sm mt-1">{formDataerr.state}</span>)}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">City<span className="text-red-500">*</span></label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"  name="city" value={formData.city} onChange={handleChange} />
            {formDataerr.city && (<span className="text-red-500 text-sm mt-1">{formDataerr.city}</span>)}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Zipcode<span className="text-red-500">*</span></label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name="zipcode" value={formData.zipcode} onChange={handleChange} />
            {formDataerr.zipcode && (<span className="text-red-500 text-sm mt-1">{formDataerr.zipcode}</span>)}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Address Line 1<span className="text-red-500">*</span></label>
            <textarea type='text' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" rows='2' name='address1' value={formData.address1} onChange={handleChange}></textarea>
            {formDataerr.address1 && (<span className="text-red-500 text-sm mt-1">{formDataerr.address1}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Address Line 2<span className="text-red-500">*</span></label>
            <textarea type='text' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" rows='2' name='address2' value={formData.address2} onChange={handleChange}></textarea>
            {formDataerr.address2 && (<span className="text-red-500 text-sm mt-1">{formDataerr.address2}</span>)}
          </div>
        </div><br/><br/>
         <h2 className="bg-gray-100 p-3 rounded-lg text-xl font-semibold mb-10">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 font-semibold">Company Name<span className="text-red-500">*</span></label>
            <input type='text' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='company_name' placeholder='Enter Company Name' value={formData.company_name} onChange={handleChange} />
            {formDataerr.company_name && (<span className="text-red-500 text-sm mt-1">{formDataerr.company_name}</span>)}</div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Company Email<span className="text-red-500">*</span></label>
            <input type='email' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='company_email' placeholder='Enter Company Email' value={formData.company_email} onChange={handleChange} />
            {formDataerr.company_email && (<span className="text-red-500 text-sm mt-1">{formDataerr.company_email}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Domain Name<span className="text-red-500">*</span></label>
            <input type='text' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='domain_name' placeholder='Enter Domain Name' value={formData.domain_name} onChange={handleChange} />
            {formDataerr.domain_name && (<span className="text-red-500 text-sm mt-1">{formDataerr.domain_name}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Country<span className="text-red-500">*</span></label>
            <select name="company_country" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" value={formData.company_country} onChange={handleChange}>
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
            {formDataerr.company_country && (<span className="text-red-500 text-sm mt-1">{formDataerr.company_country}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">State<span className="text-red-500">*</span></label>
            <select name="company_state" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" value={formData.company_state} onChange={handleChange}>
              <option value="">Select State</option>
              <option value="Gujrat">Gujrat</option>
              <option value="Maharashrta">Maharashrta</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Delhi">Delhi</option>
              <option value="Punjab">Punjab</option>
            </select>
            {formDataerr.company_state && (<span className="text-red-500 text-sm mt-1">{formDataerr.company_state}</span>)}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">City<span className="text-red-500">*</span></label>
            <input type='text' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='company_city' value={formData.company_city} onChange={handleChange} />
            {formDataerr.company_city && (<span className="text-red-500 text-sm mt-1">{formDataerr.company_city}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Zipcode<span className="text-red-500">*</span></label>
            <input type='text' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='company_code' value={formData.company_code} onChange={handleChange} />
            {formDataerr.company_code && (<span className="text-red-500 text-sm mt-1">{formDataerr.company_code}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Company Address Line 1<span className="text-red-500">*</span></label>
            <textarea type='text' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" rows='4' name='company_address1' value={formData.company_address1} onChange={handleChange}></textarea>
            {formDataerr.company_address1 && (<span className="text-red-500 text-sm mt-1">{formDataerr.company_address1}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Company Address Line 2<span className="text-red-500">*</span></label>
            <textarea type='text' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" rows='4' name='company_address2' value={formData.company_address2} onChange={handleChange}></textarea>
            {formDataerr.company_address2 && (<span className="text-red-500 text-sm mt-1">{formDataerr.company_address2}</span>)}
          </div>
        </div>
        <br/><br/>
 <h2 className="bg-gray-100 p-3 rounded-lg text-xl font-semibold mb-5">Admin Account</h2>
        {/* <h2>Admin Account</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Admin Email<span className="text-red-500">*</span></label>
            <input type='email' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='admin_email' placeholder='Enter your email' value={formData.admin_email} onChange={handleChange} />
            {formDataerr.admin_email && (<span className="text-red-500 text-sm mt-1">{formDataerr.admin_email}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Admin Password<span className="text-red-500">*</span></label>
            <input type='password' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='admin_password' placeholder='Enter your password' autoComplete="new-password" value={formData.admin_password} onChange={handleChange} />
            {formDataerr.admin_password && (<span className="text-red-500 text-sm mt-1">{formDataerr.admin_password}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">
              Check Skills <span className="text-red-500">*</span></label>

            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="skills" value="html" onChange={handleChange} checked={formData.skills.includes("html")} className="h-4 w-4" />
                HTML</label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="skills" value="css" onChange={handleChange} checked={formData.skills.includes("css")} className="h-4 w-4" />
                CSS</label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="skills" value="java" onChange={handleChange} checked={formData.skills.includes("java")} className="h-4 w-4" />
                JAVA</label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="skills" value="php" onChange={handleChange} checked={formData.skills.includes("php")} className="h-4 w-4" />
                PHP</label>
            </div>
            {formDataerr.skills && (<span className="mt-1 text-sm text-red-500">{formDataerr.skills}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Select Date<span className="text-red-500">*</span></label>
            <input type='date' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='date' value={formData.date} onChange={handleChange} />
            {formDataerr.date && (<span className="text-red-500 text-sm mt-1">{formDataerr.date}</span>)}
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Select Color<span className="text-red-500">*</span></label>
            <input type='color' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='color' value={formData.color} onChange={handleChange} />
            {formDataerr.color && (<span className="text-red-500 text-sm mt-1">{formDataerr.color}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Select Month<span className="text-red-500">*</span></label>
            <input type='month' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='month' value={formData.month} onChange={handleChange} />
            {formDataerr.month && (<span className="text-red-500 text-sm mt-1">{formDataerr.month}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Select Gender <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} className="h-4 w-4" />
                Male</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} className="h-4 w-4" />
                Female</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="gender" value="other" checked={formData.gender === "other"} onChange={handleChange} className="h-4 w-4" />
                Other</label></div>
            {formDataerr.gender && (<span className="mt-1 text-sm text-red-500">{formDataerr.gender}</span>)}</div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Select Date and Time<span className="text-red-500">*</span></label>
            <input type='datetime-local' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='datetime' value={formData.datetime} onChange={handleChange} />
            {formDataerr.datetime && (<span className="text-red-500 text-sm mt-1">{formDataerr.datetime}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Search week<span className="text-red-500">*</span></label>
            <input type='week' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='week' value={formData.week} onChange={handleChange} />
            {formDataerr.week && (<span className="text-red-500 text-sm mt-1">{formDataerr.week}</span>)}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Website URL<span className="text-red-500">*</span></label>
            <input type='url' className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600" name='url' value={formData.url} onChange={handleChange}
              placeholder="https://www.example.com" />
            {formDataerr.url && (<span className="text-red-500 text-sm mt-1">{formDataerr.url}</span>)}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button type="button" className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Reset</button>
          <button type="submit" className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">Submit</button>
        </div><br />
        <p className="text-center text-sm text-gray-600">I have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link></p>
      </form>
    </div>
  )
}

export default VendorForm;