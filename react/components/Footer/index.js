import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'

import FooterBadgeList from './components/FooterBadgeList'
import FooterLinksMatrix from './components/FooterLinksMatrix'
import FooterPaymentFormMatrix from './components/FooterPaymentFormMatrix'
import FooterSocialNetworkList from './components/FooterSocialNetworkList'
import VTEXIcon from './images/VTEX-BW.svg'
import { objectLikeBadgeArray, objectLikeLinkArray } from './propTypes'

/**
 * Footer component that appears in the bottom of every page.
 * Can be configured by the pages editor.
 */
export default class Footer extends Component {
  static displayName = 'Footer'

  static propTypes = {
    socialNetworks: objectLikeLinkArray,
    sectionLinks: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        links: objectLikeLinkArray,
      })
    ),
    badges: objectLikeBadgeArray,
    paymentForms: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        paymentTypes: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    showPaymentFormsInColor: PropTypes.bool,
    showSocialNetworksInColor: PropTypes.bool,
    logo: PropTypes.string,
    storeInformation: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }

  static defaultProps = {
    showPaymentFormsInColor: false,
    showSocialNetworksInColor: false,
    socialNetworks: [
      {
        socialNetwork: 'Facebook',
      },
    ],
    sectionLinks: [],
    badges: [],
    paymentForms: [
      {
        title: 'editor.footer.paymentForms.paymentForm',
        paymentTypes: ['MasterCard'],
      },
    ],
    storeInformations: [],
  }

  static schema = {
    title: 'editor.footer.title',
    description: 'editor.footer.description',
    type: 'object',
    properties: {
      logo: {
        type: 'string',
        title: 'editor.footer.logoUrl.title',
      },
      showPaymentFormsInColor: {
        type: 'boolean',
        title: 'editor.footer.showPaymentFormsInColor.title',
        default: false,
        isLayout: true,
      },
      showSocialNetworksInColor: {
        type: 'boolean',
        title: 'editor.footer.showSocialNetworksInColor.title',
        default: false,
        isLayout: true,
      },
      socialNetworks: {
        title: 'editor.footer.socialNetworks',
        type: 'array',
        minItems: 1,
        maxItems: 4,
        items: {
          title: 'editor.footer.socialNetworks.title',
          type: 'object',
          properties: {
            url: {
              title: 'editor.footer.socialNetworks.url.title',
              type: 'string',
            },
            socialNetwork: {
              title: 'editor.footer.socialNetworks.title',
              type: 'string',
              default: 'Facebook',
              enum: ['Facebook', 'Twitter', 'Instagram', 'Youtube'],
            },
          },
        },
      },
      sectionLinks: {
        title: 'editor.footer.linksSections',
        type: 'array',
        minItems: 0,
        maxItems: 5,
        items: {
          title: 'editor.footer.linksSections.linksSection',
          type: 'object',
          properties: {
            title: {
              title: 'editor.footer.linksSections.linksSection.title',
              type: 'string',
            },
            links: {
              title: 'editor.footer.linksSections.linksSection.links',
              type: 'array',
              minItems: 1,
              maxItems: 10,
              items: {
                title: 'editor.footer.linksSections.linksSection.links.link',
                type: 'object',
                properties: {
                  title: {
                    title:
                      'editor.footer.linksSections.linksSection.links.link.title',
                    type: 'string',
                  },
                  url: {
                    title:
                      'editor.footer.linksSections.linksSection.links.link.url',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
      badges: {
        title: 'editor.footer.badge',
        type: 'array',
        items: {
          title: 'editor.footer.badge.title',
          type: 'object',
          properties: {
            image: {
              type: 'string',
              title: 'editor.footer.badge.image.title',
            },
          },
        },
      },
      paymentForms: {
        title: 'editor.footer.paymentForms',
        type: 'array',
        minItems: 1,
        maxItems: 5,
        items: {
          title: 'editor.footer.paymentForms.paymentForm',
          type: 'object',
          properties: {
            title: {
              title: 'editor.footer.paymentForms.paymentForm.title',
              type: 'string',
            },
            paymentTypes: {
              title: 'editor.footer.paymentForms.paymentForm.paymentTypes',
              type: 'array',
              minItems: 1,
              items: {
                title:
                  'editor.footer.paymentForms.paymentForm.paymentTypes.paymentType',
                type: 'string',
                default: 'MasterCard',
                enum: ['MasterCard', 'Visa', 'Diners Club'],
              },
            },
          },
        },
      },
      storeInformations: {
        title: 'editor.footer.storeInformations',
        type: 'array',
        minItems: 0,
        maxItems: 2,
        items: {
          title: 'editor.footer.storeInformations.storeInformation',
          type: 'object',
          properties: {
            storeInformation: {
              title: 'editor.footer.storeInformations.storeInformation',
              type: 'string',
              widget: {
                'ui:widget': 'textarea',
              },
            },
          },
        },
      },
    },
  }

  render() {
    const {
      showPaymentFormsInColor,
      showSocialNetworksInColor,
      logo,
      sectionLinks,
      socialNetworks,
      paymentForms,
      badges,
      storeInformations,
    } = this.props

    return (
      <footer className="vtex-footer">
        <div className="vtex-footer__container">
          <div className="vtex-footer__links-container">
            <FooterLinksMatrix links={sectionLinks} />
          </div>
          <div className="vtex-footer__social-networks-container">
            <FooterSocialNetworkList
              titleId="social-networks"
              list={socialNetworks}
              horizontal
              alignRight
              showInColor={showSocialNetworksInColor}
            />
          </div>
        </div>
        <div className="vtex-footer__container vtex-footer__container--white">
          <FooterPaymentFormMatrix
            paymentForms={paymentForms}
            horizontal
            showInColor={showPaymentFormsInColor}
          />
        </div>
        <div className="vtex-footer__container">
          <div className="vtex-footer__text-container flex flex-wrap">
            {storeInformations &&
              storeInformations.map(({ storeInformation }, index) => (
                <div
                  key={`information-${index}`}
                  className="vtex-footer__text-information ph3">
                  {storeInformation}
                </div>
              ))}
          </div>
          <FooterBadgeList list={badges} />
          <div className="vtex-footer__badge-list vtex-footer__list-container--right-aligned">
            <span className="vtex-footer__badge">
              <img className="vtex-footer__logo-image" src={logo} />
            </span>
            <span className="vtex-footer__badge">
              <img className="vtex-footer__vtexlogo-form-item" src={VTEXIcon} />
            </span>
          </div>
        </div>
      </footer>
    )
  }
}
