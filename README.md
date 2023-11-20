## Tên dự án

MSB

Để bắt đầu với dự án này, bạn cần cài đặt [Node.js](https://nodejs.org/) và [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

Yêu cầu node >= 16 , react >= 16

### Cài Đặt

1. Clone repository:

   git clone https://github.com/amjcongtu/msb-demo.git

Di chuyển vào thư mục dự án:

cd msb-demo

## Cài đặt

yarn install hoặc npm install

## Tạo file .env

VITE_APP_BASE_API_URL=https://dummyjson.com  


## Chạy ứng dụng

yarn dev

## Build ứng dụng

yarn build


## Cấu Trúc Thư Mục

src

   assets  

      icon
      image

   components

      Menu
      Banner
      Footer
      ...

   context

      authContext

   data

      Menu.json

   helper

      storage get set cookies

   hook

      useAuth

   interface

   pages

      Home
      Profile
      ...
   
   router

      AuthRouter
      AppRouter

   service
   
      queries
      apiClient

   theme

   utils

App
