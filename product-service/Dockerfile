#menggunkan image node versi 18 dengan basis alpine
FROM node:18-alpine

# set working directory inside the container
WORKDIR /app

# copy files package.json dan package-lock.json ke working directory
COPY package*.json ./

# install dependencies
RUN npm install

# copy semua file dari project ke working directory di dalam container
COPY . .

# expose port 3000 (agar bisa diakses diluar container)
EXPOSE 3000

# jalankan perintah npm start saat container dijalankan
CMD ["npm", "start"]