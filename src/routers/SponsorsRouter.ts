/**
 * Copyright (c) 2020-2021 August
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type { Request, Response } from 'express';
import { Router } from '@augu/http';

export default class SentryRouter {
  public requests: number;
  public router: Router;

  constructor() {
    this.requests = 0;
    this.router = new Router('/sponsors');

    this.router.get('/', (req, res) => {
      this.requests++;
      return this.getSelf(req, res);
    });

    this.router.post('/', (req, res) => {
      this.requests++;
      return this.handleWebhook(req, res);
    });
  }

  private getSelf(_: Request, res: Response) {
    return res.status(200).json({
      service: 'Sponsors',
      requests: this.requests.toLocaleString('en-US')
    });
  }

  private handleWebhook(req: Request, res: Response) {
    console.log(req.body);
    // nowop
  }
}
