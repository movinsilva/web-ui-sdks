/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {TOTP} from './model';

export const totp: TOTP = {
  continue: 'Continuer',
  'enter.verification.code.got.by.device':
    "Entrez le code de vérification généré par votre application d'authentification.",
  'totp.enroll.message1': "Vous n'avez pas encore configuré votre application d'authentification TOTP?",
  'totp.enroll.message2': 'Contacter le support',
  'totp.heading': 'Vérifiez votre identité',
};
