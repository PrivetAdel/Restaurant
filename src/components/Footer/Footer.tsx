import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/Context'
import css from './Footer.module.scss'
import vkIcon from '../../assets/icon-vk.svg'
import fbIcon from '../../assets/icon-fb.svg'
import twitterIcon from '../../assets/icon-twitter.svg'
import classmatesIcon from '../../assets/icon-classmates.svg'
import appStore from '../../assets/app-store.png'
import googlePlay from '../../assets/google-play.png'

const Footer = () => {
  const { footerData } = useStore()
  const orders = [0, 1, 3, 5]

  return (
    <div className={css.footer__container}>
      <div className={css.footer__inner}>
        {footerData.map((section, index) => (
          <ul style={{order: orders[index]}} key={index}>
            <li><h3>{section.title}</h3></li>
            {section.items.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        ))}
        <div className={css.footer__logo} />
      </div>

      <div className={css.footer__contacts}>
        <div className={css.footer__social}>
          <a href='/'><img src={vkIcon} alt='vk icon' /></a>
          <a href='/'><img src={fbIcon} alt='fb icon' /></a>
          <a href='/'><img src={twitterIcon} alt='twitter icon' /></a>
          <a href='/' target='_blank'><img src={classmatesIcon} alt='classmates icon' /></a>
        </div>
        
        <div className={css.footer__download}>
          <a href='/' target='_blank'><img src={appStore} alt='app store' /></a>
          <a href='/' target='_blank'><img src={googlePlay} alt='google play' /></a>
        </div>
      </div>
    </div>
  )
}

export default observer(Footer)
