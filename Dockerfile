FROM debian:latest

RUN apt-get update && apt-get install -y \
  bash \
  curl \
  ruby \
  sudo \
  wget

# Install the Heroku Toolbelt and and add it to the PATH
RUN wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh
ENV PATH /usr/local/heroku/bin:$PATH

# RUN heroku status to install the latest version of the Heroku Toolbelt
RUN heroku status

# Clean the apt cache after Heroku Toolbelt installation
RUN apt-get clean

# Install JQ
ENV JQ_VERSION 1.5
RUN wget -q -O /usr/bin/jq https://github.com/stedolan/jq/releases/download/jq-$JQ_VERSION/jq-linux64
RUN chmod 744 /usr/bin/jq

#COPY scripts/ /usr/bin/

# gpg keys listed at https://github.com/nodejs/node
RUN set -ex \
  && for key in \
    9554F04D7259F04124DE6B476D5A82AC7E37093B \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    0034A06D9D9B0064CE8ADF6BF1747F4AD2306D93 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
  ; do \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
  done

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 5.2.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --verify SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c - \
  && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.gz" SHASUMS256.txt.asc

RUN mkdir /app
WORKDIR /app
COPY  . /app
RUN npm install
CMD [ "node" ]
