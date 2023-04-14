import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip'
import { websiteTechStack, socialLinks } from './FooterData';
import Image from 'mui-image';

const Footer: React.FC = () => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const response = await fetch(socialLinks.githubProfile());
      const data = await response.json();
      setProfileImage(data.avatar_url);
    };
    fetchProfileImage();
  }, []);

  return (
    <>
      <footer className="footerContainer">
        <div className="techstackContainer">
          <div className="madeWith">Made with: </div>
          {websiteTechStack.devicons.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <div key={i}>
                <Icon
                  size={28}
                  style={{ margin: 5 }}
                  data-tooltip-content={skill.tooltipMessage}
                  data-tooltip-id='skillTooltip'
                  data-place='top'
                />
                <Tooltip id='skillTooltip' />
              </div>
              );
            }
          )}
        </div>
        <div className="socialLinks">
          <Image
            width="100px" 
            height='100px' 
            src={profileImage} 
            alt={`${socialLinks.username} profile`} 
            style={{ 
              width: '100px', 
              borderRadius: '100px' , 
            }} 
          />
          <div className="links-container">
            {socialLinks.icons.map((link, i) => {
              const Icon = link.icon;
              return (
                <div key={i} onClick={() => window.open(`${link.link}`, "_blank")}>
                  <Icon
                    size={28}
                    style={{ margin: 5 }}
                    data-tooltip-content={link.tooltipMessage}
                    data-tooltip-id='skillTooltip'
                    data-place='top'
                  />
                  <Tooltip id='skillTooltip' />
                </div>
              );
            })}
          </div>
        </div>
        <div className="copyrightText">
          Copyright 2023
        </div>
      </footer>
    </>
  );
};

export default Footer;
