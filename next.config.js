/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/youtube",
        destination: "https://www.youtube.com/@msgrappling",
        permanent: false,
      },
      // {
      //   source: "/trial",
      //   destination: "https://grapple.gymdesk.com/signup?membership_id=6824",
      //   permanent: false,
      // },
      // {
      //   source: "/signup",
      //   destination: "https://grapple.gymdesk.com/signup?membership_id=6823",
      //   permanent: false,
      // },
    ];
  },
};

module.exports = nextConfig;
