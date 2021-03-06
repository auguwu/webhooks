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

import type { ConstructorReturnType } from '@augu/utils';
import { parse, SchemaOptions } from '@augu/dotenv';
import { Component, Inject } from '@augu/lilith';
import type Loggaby from 'loggaby';
import { join } from 'path';

interface ConfigSchema {
  DISCORD_WEBHOOK_URL?: string;
  NODE_ENV: 'development' | 'production';
  SECRET: string;
  PORT: string;
}

const schema: { [P in keyof ConfigSchema]: string | SchemaOptions } = {
  DISCORD_WEBHOOK_URL: {
    type: 'string',
    default: undefined
  },
  NODE_ENV: {
    type: 'string',
    oneOf: ['development', 'production'],
    default: 'development'
  },
  SECRET: 'string',
  PORT: {
    default: 3621,
    type: 'int'
  }
};

export default class ConfigComponent implements Component {
  public priority = 0;
  public name = 'config';

  @Inject
  private logger!: ConstructorReturnType<typeof Loggaby>;

  load() {
    this.logger.log('Loading configuration...');
    parse<ConfigSchema>({
      populate: false,
      delimiter: ',',
      schema,
      file: join(__dirname, '..', '..', '.env')
    });
  }
}
