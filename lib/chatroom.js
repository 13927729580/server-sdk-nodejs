var apis 		= require( './apis' );
var util 		= require( './util' );
var rongrequest = require( './rongrequest' );

exports.create = function( chatRoomIDNamePairs, format, callback ) {
	var params = {};
	var chatRoomId;
	var validChatRoomId = true;
	for( var i=0; i<chatRoomIDNamePairs.length; ++i ) {
		chatRoomId = chatRoomIDNamePairs[i].id;
		if( util.validateId( chatRoomId ) ) {
			validChatRoomId = false;
			break;
		}
		var key = 'chatroom[' + chatRoomId + ']';
		params[ key ] = chatRoomIDNamePairs[i].name;
	}
	if( validChatRoomId ) {
		rongrequest.request( apis['chatroom']['create'], params, format, callback );	
	}
	else {
		callback( 'Invalid chat room id', null );
	}
}

exports.destroy = function( chatRoomIDs, format, callback ) {
	if( !util.validateIDs( chatRoomIDs ) ) {
		return callback( 'Invalid chat room id', null );
	}
	rongrequest.requestWithSameFields( apis['chatroom']['destroy'], {}, [{field:'chatroomId', values:chatRoomIDs}], format, callback );
}

exports.query = function( chatRoomIDs, format, callback ) {
	// Check the IDs.
	var valid = util.validateIDs( chatRoomIDs );
	if( !valid ) {
		callback( 'Invalid symbols in chat room id', null );
	}
	else {
		rongrequest.requestWithSameFields( apis['chatroom']['query'], {}, [{field:'chatroomId', values:chatRoomIDs}], format, callback );
	}
}

exports.queryAll = function( format, callback ) {
	rongrequest.requestWithSameFields( apis['chatroom']['query'], {}, [], format, callback );
}