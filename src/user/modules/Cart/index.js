import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../../Contexts/UserContext'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const navigate = useNavigate()
  const [total, setTotal] = useState(0)
  const carts = JSON.parse(localStorage.getItem('cart')) || []

  const { user } = useUser()

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)
    setTotal(total)

    document.title = `Shopping Cart - Total: $${total.toFixed(0)}`;
  }, [carts])

  const handleInc = (id) => {
    const updateCart = carts.map(item => {
      if (item.id === id) {
        if ((item.quantity + 1) > item.attributes.quantity) {
          toast('Đặt quá số lượng sách')
        } else {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updateCart))
    navigate('/cart')
  }

  const handleDec = (id) => {
    const updateCart = carts.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity - 1);
        return {
          ...item,
          quantity: newQuantity
        }
      }
      return item
    })

    localStorage.setItem('cart', JSON.stringify(updateCart))

    navigate('/cart')
  }

  const removeProduct = (id) => {
    const updateCart = carts.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updateCart))
    navigate('/cart')
  }

  const handleCheckout = () => {
    if (user === null) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  if (carts.length === 0) return <div className='h-[60vh] flex justify-center items-center text-4xl'>
    Cart is empty</div>
  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Giỏ Hàng</h1>
            <h2 className="font-semibold text-2xl">{carts?.length} Sản phẩm</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Chi tiết sản phẩm</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Số lượng</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Giá</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Thành tiền</h3>
          </div>

          {
            carts?.map(cart => {
              return (
                <div key={cart.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-24">
                      <img className="h-24" src={`http://127.0.0.1:8000/images/${cart.attributes.image[0].image_path}`}
                        alt={cart.attributes.name} />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{cart.attributes.name}</span>
                      <span className="text-red-500 text-xs capitalize">{cart.attributes.category.name}</span>
                      <div href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                        onClick={() => removeProduct(cart?.id)}>
                        Xóa</div>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <svg className="fill-current text-gray-600 w-3 cursor-pointer"
                      onClick={() => handleDec(cart?.id)}
                      viewBox="0 0 448 512">
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>

                    <input className="mx-2 border text-center w-10" type="text" value={cart?.quantity} readOnly={true} />

                    <svg className="fill-current text-gray-600 w-3 cursor-pointer"
                      onClick={() => handleInc(cart?.id)}
                      viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                  {new Intl.NumberFormat('en-US').format(cart.price)}đ</span>
                  <span className="text-center w-1/5 font-semibold text-sm">{new Intl.NumberFormat('en-US').format(cart.price * cart?.quantity)}đ</span>
                </div>
              )
            })
          }
          <Link to="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
            Tiếp tục đặt hàng
          </Link>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Tóm tắt đơn hàng</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Sản phẩm {carts?.length}</span>
            <span className="font-semibold text-sm">{new Intl.NumberFormat('en-US').format(total.toFixed(0))}đ</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Giao hàng</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Nhanh</option>
            </select>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Tổng thành tiền</span>
              <span>{new Intl.NumberFormat('en-US').format(total.toFixed(0))}đ</span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 
              py-3 text-sm text-white uppercase w-full">Checkout</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart