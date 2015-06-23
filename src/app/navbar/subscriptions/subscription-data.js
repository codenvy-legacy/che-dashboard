/*
 * Copyright (c) 2015 Codenvy, S.A.
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
      'title' : 'SAAS Pay-As-You-Go',
      'description' : 'Our crazy fast cloud IDE and magical one-click automation hosted in our cloud.',
      'buttonTitle' : 'Add Credit Card',
      'icon' : 'assets/images/icon-saas.png',
      'content' : [
        'Unlimited workspaces, projects, developers and IDE time',
        'Machines up to 4GB RAM',
        'Always-on machines',
        '20 GB hours free per month icon',
        'Forum support'
      ]
    },
    {
      'type' : 'on-prem',
      'title' : 'On-Prem',
      'description' : 'All the power of Codenvy\'s Cloud behind your firewall, connected to your systems and processes.',
      'buttonTitle' : 'Learn More',
      'additionalButtonTitle' : 'Contact Sales',
      'icon' : 'assets/images/icon-on-prem.png'
    }
  ];

