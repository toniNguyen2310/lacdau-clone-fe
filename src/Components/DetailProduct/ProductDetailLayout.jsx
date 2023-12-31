import React, { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartService } from "../../redux/cart/cartSlice";
import SkeletonText from "../Skeleton/SkeletonText";
import ContentLoader from "react-content-loader";

function ProductDetailLayout(props) {
  const { dataProduct, isLoading } = props;
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [imagesProduct, setImagesProduct] = useState([]);
  const user = useSelector((state) => state.account.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    if (isAuthenticated) {
      //TRƯỜNG HỢP ĐÃ ĐĂNG NHẬP
      const data = { idUser: user._id, product: product };
      dispatch(addToCartService(product));
    } else {
      //TRƯỜNG HỢP KO ĐĂNG NHẬP
      dispatch(addToCartService(product));
      return;
    }
  };

  const handleBuyNow = (product) => {
    navigate("/cart");
    // dispatch(addToCartService(product));
  };

  useEffect(() => {
    if (dataProduct && dataProduct.images) {
      setImagesProduct([
        {
          original: dataProduct.images[0],
          thumbnail: dataProduct.images[0],
        },
        {
          original: dataProduct.images[1],
          thumbnail: dataProduct.images[1],
        },
        {
          original: dataProduct.images[2],
          thumbnail: dataProduct.images[2],
        },
      ]);
    }
  }, [dataProduct]);

  return (
    <>
      {isLoading ? (
        <div className="detail-product container">
          <div className="detail-product-content">
            <div className="img-detail">
              <ContentLoader
                className="skeleton-img"
                backgroundColor="#f0f0f0"
                foregroundColor="#dedede"
                {...props}
              >
                <rect className="skeleton-img-rect" />
              </ContentLoader>
            </div>
            <div className="content-detail">
              <div className="footer-detail ">
                <h2>
                  <SkeletonText width={"200px"} height={"20px"} />
                </h2>
                <div className="product-description">
                  <p className="product-description-title">Thông số sản phẩm</p>
                  <p className="product-description-feature">
                    <SkeletonText width={"220px"} height={"20px"} />
                  </p>
                  <p className="product-description-feature">
                    <SkeletonText width={"250px"} height={"20px"} />
                  </p>
                </div>
                <div className="price mt-4">
                  <span className="price-title">Giá:</span>
                  <span className="price-product">
                    <span>
                      <SkeletonText width={"150px"} height={"25px"} />
                    </span>
                  </span>
                </div>
                <div className="button-footer">
                  <button className="btn btn-danger add-to-cart">
                    Thêm vào giỏ
                  </button>

                  <button className="btn btn-danger go-to-cart">
                    Đi tới giỏ hàng
                  </button>
                </div>
                <div className="detail-product-sale ">
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_1_ico.png?v=3"
                    />
                    <span>Cam kết 100% chính hãng</span>
                  </div>
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_2_ico.png?v=3"
                    />
                    <span>Miễn phí giao hàng</span>
                  </div>
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_3_ico.png?v=3"
                    />
                    <span>Hỗ trợ 24/7</span>
                  </div>
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_4_ico.png?v=3"
                    />
                    <span>Hoàn tiền 111% nếu hàng giả</span>
                  </div>
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_5_ico.png?v=3"
                    />
                    <span>Mở hộp kiểm tra nhận hàng</span>
                  </div>
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_6_ico.png?v=3"
                    />
                    <span>Đổi trả trong 7 ngày</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="detail-product container">
          <div className="detail-product-content">
            <div className="img-detail">
              <ReactImageGallery className="image" items={imagesProduct} />
            </div>
            <div className="content-detail">
              <div className="footer-detail">
                <h2>{dataProduct?.name} </h2>

                <div className="product-description">
                  <p className="product-description-title">Thông số sản phẩm</p>
                  <p className="product-description-feature">
                    {dataProduct?.description}
                  </p>
                </div>
                <div className="price mt-4">
                  <span className="price-title">Giá:</span>
                  {dataProduct.discount === "0" ? (
                    <span className="price-product">
                      <span>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(dataProduct?.priceAfter)}
                      </span>
                    </span>
                  ) : (
                    <span className="price-product">
                      <span>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(dataProduct?.priceAfter)}
                      </span>
                      <span className="price-product-sale">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(dataProduct?.price)}
                      </span>
                      <span className="price-product-discount">
                        (Tiết kiệm:{dataProduct?.discount}%)
                      </span>
                    </span>
                  )}
                </div>
                <div className="button-footer">
                  <button
                    onClick={() => handleAddToCart(dataProduct)}
                    className="btn btn-danger add-to-cart"
                  >
                    Thêm vào giỏ
                  </button>

                  <button
                    onClick={() => handleBuyNow(dataProduct)}
                    className="btn btn-danger go-to-cart"
                  >
                    Đi tới giỏ hàng
                  </button>
                </div>
                <div className="detail-product-sale ">
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_1_ico.png?v=3"
                    />
                    <span>Cam kết 100% chính hãng</span>
                  </div>
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_2_ico.png?v=3"
                    />
                    <span>Miễn phí giao hàng</span>
                  </div>
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_3_ico.png?v=3"
                    />
                    <span>Hỗ trợ 24/7</span>
                  </div>
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_4_ico.png?v=3"
                    />
                    <span>Hoàn tiền 111% nếu hàng giả</span>
                  </div>
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_5_ico.png?v=3"
                    />
                    <span>Mở hộp kiểm tra nhận hàng</span>
                  </div>
                  <div className="icon-sale">
                    <img
                      loading="lazy"
                      src="https://theme.hstatic.net/200000108863/1000985860/14/product_deliverly_6_ico.png?v=3"
                    />
                    <span>Đổi trả trong 7 ngày</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetailLayout;
