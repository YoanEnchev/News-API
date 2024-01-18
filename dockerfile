FROM ubuntu:22.04

WORKDIR /var/www/news_api
EXPOSE 80

# Install NODE JS:
ENV NODE_VERSION=21.5.0
RUN apt update
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

# Avoids cross-env: not found when executing npm run watch.
RUN npm install --global cross-env

# Makes it visible to the ENTRYPOINT instruction.
COPY entrypoint.sh /

ENTRYPOINT ["sh", "/entrypoint.sh"]