FROM mcr.microsoft.com/devcontainers/base:jammy

ENV DEV_TERRAFORM_VERSION=1.5.2

RUN apt update && \
  curl -LO https://releases.hashicorp.com/terraform/${DEV_TERRAFORM_VERSION}/terraform_${DEV_TERRAFORM_VERSION}_linux_amd64.zip && \
  unzip terraform_${DEV_TERRAFORM_VERSION}_linux_amd64.zip && \
  mv terraform /usr/local/bin/ && \
  rm terraform_${DEV_TERRAFORM_VERSION}_linux_amd64.zip
