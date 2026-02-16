import { expect } from 'chai';
import sinon from 'sinon';
import SlsPlugin from '../index.js';

describe('SlsPlugin', () => {
  let serverless;
  let options;
  let plugin;
  let logSpy;

  beforeEach(() => {
    serverless = { cli: { log() {} } };
    options = { someOption: 'someValue' };
    plugin = new SlsPlugin(serverless, options);
    logSpy = sinon.spy(serverless.cli, 'log');
  });

  afterEach(() => {
    logSpy.restore();
  });

  describe('constructor', () => {
    it('should set serverless and options', () => {
      expect(plugin.serverless).to.equal(serverless);
      expect(plugin.options).to.equal(options);
    });

    it('should set default options if none provided', () => {
      const pluginWithDefaultOptions = new SlsPlugin(serverless);
      expect(pluginWithDefaultOptions.options).to.deep.equal({});
    });

    it('should set hooks', () => {
      expect(plugin.hooks).to.have.property('initialize');
    });
  });

  describe('initialize', () => {
    it('should log initialization and options', () => {
      plugin.initialize();
      expect(logSpy.calledWith('Initializing plugin')).to.be.true;
      expect(logSpy.calledWith('Options:', options)).to.be.true;
    });
  });
});
