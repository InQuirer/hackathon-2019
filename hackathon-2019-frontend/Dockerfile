FROM node:10 as build-deps

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY public ./public
COPY src ./src
RUN yarn build


FROM nginx:alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# USAGE:
#
# docker build . -t inquirer/hackathon-2019-frontend
# docker run -p 8080:80 inquirer/hackathon-2019-frontend
# docker run -it --rm -p 8080:80 inquirer/hackathon-2019-frontend