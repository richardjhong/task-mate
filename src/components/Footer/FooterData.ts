import { SiNextdotjs, SiTypescript, SiReact, SiGraphql, SiHeroku, SiMongodb, SiApollographql } from "react-icons/si";
import { FaNode, FaGithub, FaLinkedin } from "react-icons/fa";

export const websiteTechStack = {
  devicons: [
    {
      icon: SiTypescript,
      tooltipMessage: "TypeScript"
    },
    {
      icon: SiNextdotjs,
      tooltipMessage: "Next.js"
    },
    {
      icon: SiReact,
      tooltipMessage: "React"
    },
    {
      icon: SiGraphql,
      tooltipMessage: "GraphQL"
    },
    {
      icon: SiApollographql,
      tooltipMessage: "Apollo"
    },
    {
      icon: FaNode,
      tooltipMessage: "Node"
    },
    {
      icon: SiMongodb,
      tooltipMessage: "MongoDB"
    },
    {
      icon: SiHeroku,
      tooltipMessage: "Heroku"
    },
  ]
}

export const socialLinks = {
  username: 'richardjhong',
  githubProfile: function() {
    if (this.username === undefined) {
      throw new Error('username is not defined');
    };
    return `https://api.github.com/users/${this.username}`;
  },
  icons: [
    {
      icon: FaGithub,
      tooltipMessage: 'Github',
      link: 'https://github.com/richardjhong'
    },
    {
      icon: FaLinkedin,
      tooltipMessage: 'LinkedIn',
      link: 'https://www.linkedin.com/in/hongjrichard/'
    }
  ]
};
