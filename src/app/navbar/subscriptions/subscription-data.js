/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

export var  subscriptionDetails = [
  {
    'type' : 'on-prem',
    'title' : 'On-Prem',
  },
  {
    'type' : 'pay-as-you-go',
    'title' : 'Pay-As-You-Go Account',
    'buttonTitle' : 'Remove Credit Card',
    'icon' : 'assets/images/icon-saas.png'
  },
  {
    'type' : 'prepaid',
    'title' : 'SaaS Pre-Paid Subscription',
    'buttonTitle' : 'Cancel',
    'icon' : 'assets/images/icon-saas.png'
  }
];

export var subscriptionOffers = [
    {
      'type' : 'pay-as-you-go',
      'title' : 'SaaS Pay-as-you-Go Account',
      'description' : 'Self-service workspaces for 150K users and 400K projects.',
      'buttonTitle' : 'Add Credit Card',
      'icon' : 'assets/images/icon-saas.png',
      price: '0.15',
      priceUnit: '$',
      priceDesc: 'per gigabyte hour',
      'content' : [
        'Unlimited workspaces, projects, developers and IDE time',
        'Machines up to 200GB RAM',
        'Always-on machines',
        '20 GB hours free per month',
        'Billing starts after free GB hours',
        '<a href="https://codenvy.com/technical-support" target="_blank">Premium support</a> and ' +
        '<a href="https://codenvy.com/docs/ce-service-level-agreement.pdf" target="_blank">SLA</a>',
        'Contact us for pre-paid discounts'
      ]
    },
    {
      'type' : 'on-prem',
      'title' : 'On-Prem',
      'description' : 'Workspaces behind your firewall connected to your systems.',
      'buttonTitle' : 'Learn More',
      'additionalButtonTitle' : 'Contact Sales',
      'icon' : 'assets/images/icon-on-prem.png',
      price: '300',
      priceUnit: '$',
      priceDesc: 'per user per year',
      content : [
        'For private cloud or datacenter',
        'Integrate with local systems',
        'Add custom plugins',
        'No data shared with Codenvy',
        '<a href="https://codenvy.com/technical-support" target="_blank">Premium support</a>'
      ]
    }
  ];

