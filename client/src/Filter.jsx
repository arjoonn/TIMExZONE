import React, { useState } from "react";
import { Form } from "react-bootstrap";

function Filter({ allProducts, setWatch }) {
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([])
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const applyFilter = (updatedGender, updatedBrand, updatedPrice) => {
    let filterd = allProducts;
    if (updatedGender.length > 0) {
      filterd = filterd.filter((item) => updatedGender.includes(item.gender));
    }
    if (updatedBrand.length > 0) {
      filterd = filterd.filter((item) => updatedBrand.includes(item.brand));
    }
    if (updatedPrice.length > 0) {
      filterd = filterd.filter((item) =>{
        return updatedPrice.some((range)=>{
          if(range==="below1000") return item.price<1000;
          if(range==="1000to3000") return item.price>1000 && item.price<3000;
          if(range === "above5000") return item.price>5000;
          return true;
        })
      })
    }
    setWatch(filterd);
  };

  const handleGenderChecked = (gender, checked) => {
    let update; //array that store the genders
    if (checked) {
      update = [...selectedGenders, gender];
    } else {
      update = selectedGenders.filter((g) => g !== gender);
    }
    setSelectedGenders(update);
    applyFilter(update, selectedBrands, selectedPrice);
  };

  //filter for brands
  const handleBrandChecked = (brand, checked) => {
    let update; //array that store the brands
    if (checked) {
      update = [...selectedBrands, brand];
    } else {
      update = selectedBrands.filter((b) => b !== brand);
    }
    setSelectedBrands(update);
    applyFilter(selectedGenders, update, selectedPrice);
  };

  //filter using price
  const handlePriceUpdate = (price, checked) => {
    let update;
    if (checked) {
      update = [...selectedPrice,price]
    } else {
      update = selectedPrice.filter((p) => p !== price)
    }
    setSelectedPrice(update)
    applyFilter(selectedGenders,selectedBrands,update)
  }

  return (
    <>
      <div className="genderFilter">
        <h6 onClick={() => setIsGenderOpen(!isGenderOpen)}>
          Gender {isGenderOpen ? "-" : "+"}
        </h6>
        <div className={`filterContent ${isGenderOpen ? "open" : "closed"}`}>
          <Form.Check
            type="checkbox"
            label="male"
            onChange={(e) => handleGenderChecked("Male", e.target.checked)}
            className="filterOption"
          />
          <Form.Check
            type="checkbox"
            label="female"
            onChange={(e) => handleGenderChecked("Female", e.target.checked)}
            className="filterOption"
          />
          <Form.Check
            type="checkbox"
            label="Unisex"
            onChange={(e) => handleGenderChecked("Unisex", e.target.checked)}
            className="filterOption"
          />
        </div>
      </div>

      <div className="brandFilter">
        <h6 onClick={() => setIsBrandOpen(!isBrandOpen)}>
          Brand {isBrandOpen ? "-" : "+"}
        </h6>
        <div className={`filterContent ${isBrandOpen ? "open" : "closed"}`}>
          <Form.Check
            type="checkbox"
            label="Fastrack"
            onChange={(e) => handleBrandChecked("Fastrack", e.target.checked)}
            className="filterOption"
          />
          <Form.Check
            type="checkbox"
            label="Cartier"
            onChange={(e) => handleBrandChecked("CARTEIR", e.target.checked)}
            className="filterOption"
          />
          <Form.Check
            type="checkbox"
            label="Casio"
            onChange={(e) => handleBrandChecked("CASIO", e.target.checked)}
            className="filterOption"
          />
          <Form.Check
            type="checkbox"
            label="G-SHOCK"
            onChange={(e) => handleBrandChecked("G-SHOCK", e.target.checked)}
            className="filterOption"
          />
        </div>
      </div>
      <div className="priceFilter">
        <h6 onClick={() => setIsPriceOpen(!isPriceOpen)}>
          Price {isPriceOpen ? "-" : "+"}
        </h6>
        <div className={`filterContent ${isPriceOpen ? "open" : "closed"}`}>
          <Form.Check
            type="checkbox"
            label="Below 1000"
            onChange={(e) => handlePriceUpdate("below1000", e.target.checked)}
            className="filterOption"
          />
          <Form.Check
            type="checkbox"
            label="1000 - 3000"
            onChange={(e) => handlePriceUpdate("1000to3000", e.target.checked)}
            className="filterOption"
          />
          <Form.Check
            type="checkbox"
            label="Above 5000"
            onChange={(e) => handlePriceUpdate("above5000", e.target.checked)}
            className="filterOption"
          />
        </div>
      </div>
    </>
  );
}

export default Filter;
