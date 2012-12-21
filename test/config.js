module.exports = {
  appKey: 'kid_VVwbxsyyOf',
  appSecret: '690ca1b830f34149b0058df62a568a28',
  masterSecret: 'e0bb9c60bb7442dc93168ad4583c4d99',

  constants: {
    // Constants
    DATABASE_ERROR: 'DatabaseError',
    NO_NETWORK: 'NoNetwork',
    REQUEST_FAILED: 'RequestFailed',
    RESPONSE_PROBLEM: 'ResponseProblem',

   // Server-side.
    ENTITY_NOT_FOUND: 'EntityNotFound',
    COLLECTION_NOT_FOUND: 'CollectionNotFound',
    APP_NOT_FOUND: 'AppNotFound',
    USER_NOT_FOUND: 'UserNotFound',
    BLOB_NOT_FOUND: 'BlobNotFound',
    INVALID_CREDENTIALS: 'InvalidCredentials',
    KINVEY_INTERNAL_ERROR_RETRY: 'KinveyInternalErrorRetry',
    KINVEY_INTERNAL_ERROR_STOP: 'KinveyInternalErrorStop',
    USER_ALREADY_EXISTS: 'UserAlreadyExists',
    DUPLICATE_END_USERS: 'DuplicateEndUsers',
    INSUFFICIENT_CREDENTIALS: 'InsufficientCredentials',
    WRITES_TO_COLLECTION_DISALLOWED: 'WritesToCollectionDisallowed',
    INDIRECT_COLLECTION_ACCESS_DISALLOWED : 'IndirectCollectionAccessDisallowed',
    APP_PROBLEM: 'AppProblem',
    PARAMETER_VALUE_OUT_OF_RANGE: 'ParameterValueOutOfRange',
    CORS_DISABLED: 'CORSDisabled',
    INVALID_QUERY_SYNTAX: 'InvalidQuerySyntax',
    MISSING_QUERY: 'MissingQuery',
    JSON_PARSE_ERROR: 'JSONParseError',
    MISSING_REQUEST_HEADER: 'MissingRequestHeader',
    INCOMPLETE_REQUEST_BODY: 'IncompleteRequestBody',
    MISSING_REQUEST_PARAMETER: 'MissingRequestParameter',
    INVALID_IDENTIFIER: 'InvalidIdentifier',
    BAD_REQUEST: 'BadRequest',
    FEATURE_UNAVAILABLE: 'FeatureUnavailable',
    API_VERSION_NOT_IMPLEMENTED: 'APIVersionNotImplemented',
    API_VERSION_NOT_AVAILABLE: 'APIVersionNotAvailable',
    INPUT_VALIDATION_FAILED: 'InputValidationFailed',
    BL_RUNTIME_ERROR: 'BLRuntimeError',
    BL_SYNTAX_ERROR: 'BLSyntaxError',
    BL_TIMEOUT_ERROR: 'BLTimeoutError',
    BL_VIOLATION_ERROR: 'BLViolationError',
    BL_INTERNAL_ERROR: 'BLInternalError',
    STALE_REQUEST: 'StaleRequest'
  }
};