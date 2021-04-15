Going to production
-------------------

Don't do things as root user.

To install docker on ubuntu server use https://get.docker.com/

Set environment variables on ubuntu server.
Create a `.env` file on prod server.
In `.profile` add `set -o allexport; source /root/.env; set +o allexport`

Clone repo into app folder.

Images should never be built on production server.

Build image on dev server.
Push to docker hub.