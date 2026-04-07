import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// icons
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// images
import team_member_1 from '../../../assets/about/1.png'
import team_member_2 from '../../../assets/about/member2.png'
import team_member_4 from '../../../assets/about/member4.png'
import team_member_3 from '../../../assets/about/member3.png'

// team member details data
const teamMembersDetails = [
    {
        id: 1,
        name: 'Abhishek Dabral',
        photo: team_member_1,
        role: 'Project Lead',
        linkedInLink: 'https://www.linkedin.com/in/abhishek-dabral-4884ba210?utm_source=share_via&utm_content=profile&utm_medium=member_android',
        instagramLink: 'https://www.instagram.com/annuragdabral?utm_source=qr&igsh=MWhoMWpnaDM0d2RuMA==',
    },
    {
        id: 2,
        name: 'Ethan Brooks',
        photo: team_member_2,
        role: 'Software Engineer',
        linkedInLink: 'https://www.linkedin.com/in/pradeep-singh-b300362b3/',
        xLink: '#',
        instagramLink: 'https://www.instagram.com/ps_prad_eep/',
        facebookLink: '#',
    },
    {
        id: 3,
        name: 'Lucas Bennett',
        photo: team_member_3,
        role: 'Frontend Developer',
        linkedInLink: 'https://www.linkedin.com/in/pradeep-singh-b300362b3/',
        xLink: '#',
        instagramLink: 'https://www.instagram.com/ps_prad_eep/',
    },
    {
        id: 4,
        name: 'Noah Anderson',
        photo: team_member_4,
        role: 'Botanical Illustrator',
        linkedInLink: 'https://www.linkedin.com/in/pradeep-singh-b300362b3/',
        instagramLink: 'https://www.instagram.com/ps_prad_eep/',
    },
]

// for number of cards according to screen size in carousel
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
};

const OurTeam = () => {
  return (
    <>
        <div className='w-[75%] max-w-[1280px] mx-auto'>
            <div className='mt-24'>

                {/* heading */}
                <p className='text-3xl font-bold tracking-wider'>
                    Meet our Creative Team
                </p>

                {/* carousel */}
                <div className='mt-8'>
                    <Carousel
                        swipeable={true}
                        draggable={false}
                        pauseOnHover={false}
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={5000}
                        keyBoardControl={true}
                        transitionDuration={500}
                        className='z-10 py-4'
                        >
                            {
                                teamMembersDetails.map((member) => (
                                    <div 
                                        key={member.id}
                                        className='flex flex-col items-center justify-center h-[270px] rounded-lg p-2 mx-2 bg-[#F6F6F6] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
                                    >   
                                        {/* image */}
                                        <div className='bg-[#ede0fe] h-[70%] w-full rounded-lg'>
                                            <img 
                                                src={member.photo} 
                                                alt={`${member.name} photo`} 
                                                loading='lazy'
                                                className='h-full w-full object-contain'    
                                            />
                                        </div>

                                        {/* name and role */}
                                        <div className='mt-2 text-center'>
                                            <p className='text-lg text-richblack-700 tracking-wide'>
                                                {member.name}
                                            </p>
                                            <p className='-mt-2 text-[1rem] text-richblack-500 tracking-wide'>
                                                {member.role}
                                            </p>
                                        </div>
                                        
                                        {/* social links */}
                                        <div className='mt-2 flex justify-center items-center gap-4'>
                                            {
                                                member.linkedInLink && (
                                                    <a 
                                                        href={member.linkedInLink} 
                                                        target="_blank" 
                                                        className='hover:scale-120 transition-all duration-300 rounded-full'
                                                    >
                                                        <FaLinkedinIn size={18}/>
                                                    </a>
                                                )
                                            }
                                            {
                                                member.instagramLink && (
                                                    <a 
                                                        href={member.instagramLink} 
                                                        target='_blank' 
                                                        className='hover:scale-120 transition-all duration-300'
                                                    >
                                                        <FaInstagram size={18}/>
                                                    </a>
                                                )
                                            }
                                            {
                                                member.xLink && (
                                                    <a 
                                                        href={member.xLink} 
                                                        target='_blank' 
                                                        className='hover:scale-120 transition-all duration-300'
                                                    >
                                                        <FaXTwitter size={18}/>
                                                    </a>
                                                )
                                            }
                                            {
                                                member.facebookLink && (
                                                    <a 
                                                        href={member.facebookLink} 
                                                        target='_blank' 
                                                        className='hover:scale-120 transition-all duration-300'
                                                    >
                                                        <FaFacebookF size={18}/>
                                                    </a>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                    </Carousel>
                </div>

            </div>
        </div>
    </>
  )
}

export default OurTeam
