import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getListBrandByCategory, getProducts } from "../../services.js/api";
import { useDebounce } from "../../utils/hook";
import { dataBrand } from "../AdminControl/ManagerProducts";
import SkeletonText from "../Skeleton/SkeletonText";
import CategoryFillterResponsive from "./CategoryFillterResponsive";
import CategoryFilter from "./CategoryFilter";
import CategoryProduct from "./CategoryProduct";
import "./category.scss";
import {
  banGaming,
  banPhimGaming,
  chuotGaming,
  gheGaming,
  loaIcon,
  lotChuot,
  moHinh,
  phuKien,
  taiNghe,
  tayCamGaming,
} from "../Export/ExportVarible";

function Category(props) {
  const navigate = useNavigate();
  const [listData, setListData] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState({ brand: "", price: "", sort: "" });
  //FILTER SORT
  const [checkSort, setCheckSort] = useState("");
  //FIRST LOAD
  const [firstLoad, setFirstLoad] = useState(true);
  const [checkBrand, setCheckBrand] = useState("");
  const [checkPrice, setCheckPrice] = useState("");
  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);
  const [total, setTotal] = useState(0);
  const [categoryLabel, setCategoryLabel] = useState("");
  //RESPONSIVE
  const [filterRes, setFilterRes] = useState(false);
  //FILTER VALUE
  const [filterValue, setFilterValue] = useState({
    category: "",
    brand: "",
    price: "",
    sort: "",
  });

  //Debounce
  let location = useLocation();
  const debounceLocation = useDebounce(location, 50);
  const debounceCurrentPage = useDebounce(currentPage, 50);
  const debounceFilterValue = useDebounce(filterValue, 50);

  //FETCH PRODUCT
  const fetchProduct = async () => {
    if (!filterValue.category) {
      return;
    }
    if (filterValue) {
      setIsLoading(true);
      const query = `current=${currentPage}&pageSize=${pageSize}&category=${filterValue.category}&brand=${filterValue.brand}&priceAfter=${filterValue.sort}&filterPrice=${filterValue.price}`;

      //FETCH PRODUCT
      const res = await getProducts(query);

      if (res && res.data) {
        setListData(res.data.products);
        setTotal(res.data.count);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const navigateParams = () => {
    let arrayParams = [
      params.brand ? params.brand : null,
      params.price ? params.price : null,
      params.sort ? params.sort : null,
    ];
    arrayParams = arrayParams.filter((e) => e != null);

    if (arrayParams.length === 0) {
      navigate("");
    } else {
      navigate(`?${arrayParams.join("&")}`);
    }
  };

  //HANDLE LIST BRAND
  const renderListBrand = async (category) => {
    // if (currentPage === 1) {
    switch (category) {
      case "lot-chuot":
        setListBrand(lotChuot);
        setCategoryLabel(lotChuot[0].category);
        break;
      case "chuot-gaming":
        setListBrand(chuotGaming);
        setCategoryLabel(chuotGaming[0].category);
        break;
      case "ban-phim-gaming":
        setListBrand(banPhimGaming);
        setCategoryLabel(banPhimGaming[0].category);
        break;
      case "tai-nghe":
        setListBrand(taiNghe);
        setCategoryLabel(taiNghe[0].category);
        break;
      case "tay-cam-gaming":
        setListBrand(tayCamGaming);
        setCategoryLabel(tayCamGaming[0].category);
        break;
      case "loa":
        setListBrand(loaIcon);
        setCategoryLabel(loaIcon[0].category);
        break;
      case "mo-hinh":
        setListBrand(moHinh);
        setCategoryLabel(moHinh[0].category);
        break;
      case "phu-kien":
        setListBrand(phuKien);
        setCategoryLabel(phuKien[0].category);
        break;
      case "ghe-gaming":
        setListBrand(gheGaming);
        setCategoryLabel(gheGaming[0].category);
        break;
      case "ban-gaming":
        setListBrand(banGaming);
        setCategoryLabel(banGaming[0].category);
        break;
    }
    // }
  };

  //NEW-END
  const handleOnchangeProductsFilter = (pagination) => {
    window.scrollTo(0, 0);
    if (pagination !== currentPage) {
      setCurrentPage(pagination);
    }
  };

  //LOCATION
  useEffect(() => {
    //CATEGORY
    const categoryLocation = location?.pathname.split("/")[2];

    //BRAND
    const brandLocation = new URLSearchParams(location.search).get("brand")
      ? new URLSearchParams(location.search).get("brand")
      : "";

    //FILTER OPTION PRICE
    const priceLocation = new URLSearchParams(location.search).get("price")
      ? new URLSearchParams(location.search).get("price")
      : "";

    //SORT PRICE
    const sortLocation = new URLSearchParams(location.search).get("sort")
      ? new URLSearchParams(location.search).get("sort")
      : "";

    if (
      params.brand.includes(brandLocation) &&
      params.price.includes(priceLocation) &&
      params.sort.includes(sortLocation)
    ) {
      if (categoryLocation != filterValue.category) {
        renderListBrand(categoryLocation);
      }
      setFilterValue({
        category: categoryLocation,
        brand: brandLocation,
        price: priceLocation,
        sort:
          sortLocation === "increase"
            ? "1"
            : sortLocation === "decrease"
            ? "-1"
            : sortLocation,
      });
    } else {
      if (firstLoad) {
        brandLocation && setCheckBrand(brandLocation);
        priceLocation && setCheckPrice(priceLocation);
      }
      setParams({
        ...params,
        brand: brandLocation ? `brand=${brandLocation}` : "",
        price: priceLocation ? `price=${priceLocation}` : "",
      });
      setFilterValue({
        category: categoryLocation,
        brand: brandLocation ? brandLocation : "",
        price: priceLocation ? priceLocation : "",
        sort: "",
      });

      renderListBrand(categoryLocation);
      return;
    }
  }, [debounceLocation]);

  //CURRENT PAGINATION
  useEffect(() => {
    fetchProduct();
  }, [debounceCurrentPage]);

  //VALUE FILTER
  useEffect(() => {
    setCurrentPage(1);
    fetchProduct();
  }, [debounceFilterValue]);

  //PARAMS
  useEffect(() => {
    navigateParams();
    // console.log("current page>>>", currentPage);
  }, [params]);

  return (
    <div
      className="page-category"
      // style={filterRes ? { overflow: "hidden" } : { overflow: "scroll" }}
    >
      <div className="category">
        <nav className="category-header">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            TRANG CHỦ
          </span>
          &nbsp;/&nbsp;
          {isLoading ? (
            <SkeletonText width={"150px"} height={"12px"} />
          ) : (
            <>
              <span>{categoryLabel}</span>
            </>
          )}
        </nav>
        <div className="category-container">
          <CategoryFilter
            setCheckSort={setCheckSort}
            params={params}
            setParams={setParams}
            filterValue={filterValue}
            listData={listData}
            currentPage={currentPage}
            listBrand={listBrand}
            firstLoad={firstLoad}
            setFirstLoad={setFirstLoad}
            setCheckBrand={setCheckBrand}
            checkBrand={checkBrand}
            checkPrice={checkPrice}
            setCheckPrice={setCheckPrice}
            setCurrentPage={setCurrentPage}
          />

          <CategoryProduct
            filterRes={filterRes}
            setFilterRes={setFilterRes}
            setCheckSort={setCheckSort}
            checkSort={checkSort}
            params={params}
            setParams={setParams}
            listData={listData}
            currentPage={currentPage}
            pageSize={pageSize}
            total={total}
            handleOnchangeProductsFilter={handleOnchangeProductsFilter}
            filterValue={filterValue}
            categoryLabel={categoryLabel}
            isLoading={isLoading}
          />
        </div>
        <CategoryFillterResponsive
          setFilterRes={setFilterRes}
          filterRes={filterRes}
          setCheckSort={setCheckSort}
          params={params}
          setParams={setParams}
          filterValue={filterValue}
          listData={listData}
          currentPage={currentPage}
          listBrand={listBrand}
          firstLoad={firstLoad}
          setFirstLoad={setFirstLoad}
          setCheckBrand={setCheckBrand}
          checkBrand={checkBrand}
          checkPrice={checkPrice}
          setCheckPrice={setCheckPrice}
        />
      </div>
    </div>
  );
}

export default Category;
