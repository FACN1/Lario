const Request = require('request');
const jwt = require('jsonwebtoken');
const queryString = require('querystring');
require('env2')('./config.env');

const tempHandler = (request, reply) => {
  if (!request.query.code) {
    reply.redirect('/');
  }
  const postRequestOptions = {
    url: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    form: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: request.query.code
    }
  };
  Request(postRequestOptions, (error, response, body) => {
    if (error) {
      reply(error);
    }
    const responseBody = queryString.parse(body);
    const permToken = responseBody.access_token;

    const getRequestOptions = {
      url: 'https://api.github.com/user',
      method: 'GET',
      headers: {
        'User-Agent': 'oauth_github_jwt',
        Authorization: `token ${permToken}`,
      }
    };
    Request(getRequestOptions, (getError, getResult, getBody) => {
      if (getError) {
        reply(getError);
      }
      const parsedGetBody = JSON.parse(getBody);
      const orgOptions = {
        method: 'GET',
        url: parsedGetBody.organizations_url,
        headers: {
          'User-Agent': 'oauth_github_jwt',
          Authorization: `token ${permToken}`,
        }
      };
      Request(orgOptions, (orgError, orgResponse, orgBody) => {
        if (orgError) {
          reply(orgError);
        }
        const parsedOrgBody = JSON.parse(orgBody);
        if (!parsedOrgBody.find(organization => organization.login === 'FACN1')) {
          reply.redirect('/');
        }
        const jwtOptions = {
          expiresIn: Date.now() + (24 * 60 * 60 * 1000),
          subject: 'github-data',
        };
        const payload = {
          user: {
            username: JSON.parse(getBody).login,
            img_url: JSON.parse(getBody).avatar_url,
            user_id: JSON.parse(getBody).id,
          },
          accessToken: permToken,
        };
        jwt.sign(payload, process.env.SECRET, jwtOptions, (jwtError, token) => {
          reply.redirect('/home').state('token', token, {
            path: '/',
            isHttpOnly: false,
            isSecure: process.env.NODE_ENV === 'PRODUCTION'
          });
        });
      });
    });
  });
};

module.exports = {
  method: 'GET',
  path: '/temp',
  handler: tempHandler
};
