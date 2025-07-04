# FROM node:24-alpine3.21 as base

# # Set the working directory
# WORKDIR /app

# # Copy package files and install dependencies
# COPY package.json yarn.lock ./
# RUN yarn install \
#     --non-interactive \
#     --frozen-lockfile \
#     --prefer-offline \
#     --ignore-optional \
#     --production 

# # Install nodemon and ts-node if not already in package.json
# RUN yarn add -D nodemon ts-node typescript

# # Copy the rest of your source code
# COPY . .

# # Expose the port your app uses (optional)
# EXPOSE 4004

# # Start the development server using nodemon
# CMD ["yarn", "start"]

FROM node:24-alpine3.21 AS base
ENV APP_HOME=/app

RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME

COPY package.json yarn.lock .npmrc $APP_HOME/

FROM base AS dependencies
RUN yarn install \
    --non-interactive \
    --frozen-lockfile \
    --prefer-offline \
    --ignore-optional \
    --production 

RUN yarn add -D nodemon ts-node typescript

FROM base AS release
COPY --from=dependencies $APP_HOME/node_modules $APP_HOME/node_modules
COPY . $APP_HOME
EXPOSE 4004
CMD ["yarn", "start"]
