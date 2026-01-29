"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActivity = void 0;
const models_1 = require("../models");
/**
 * Log admin activity for create, update, delete operations
 */
const logActivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Store original methods to capture response
    const originalJson = res.json.bind(res);
    const originalSend = res.send.bind(res);
    // Capture response data
    let responseData = null;
    res.json = function (data) {
        responseData = data;
        return originalJson(data);
    };
    res.send = function (data) {
        responseData = data;
        return originalSend(data);
    };
    // Log after response is sent
    res.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (!user)
                return; // Skip if not authenticated
            const method = req.method;
            const path = req.path;
            let action = '';
            let entityType = '';
            let entityId = null;
            // Determine action and entity type from route
            if (path.includes('/new-arrivals')) {
                entityType = 'product';
                if (method === 'POST')
                    action = 'create';
                else if (method === 'PUT' || method === 'PATCH')
                    action = 'update';
                else if (method === 'DELETE')
                    action = 'delete';
                else if (path.includes('/status'))
                    action = 'update_status';
                else if (path.includes('/priority'))
                    action = 'update_priority';
            }
            else if (path.includes('/blogs')) {
                entityType = 'blog';
                if (method === 'POST')
                    action = 'create';
                else if (method === 'PUT' || method === 'PATCH')
                    action = 'update';
                else if (method === 'DELETE')
                    action = 'delete';
                else if (path.includes('/status'))
                    action = 'update_status';
            }
            else if (path.includes('/media')) {
                entityType = 'media';
                if (method === 'POST')
                    action = 'upload';
                else if (method === 'PUT')
                    action = 'update';
                else if (method === 'DELETE')
                    action = 'delete';
            }
            // Extract entity ID from response or params
            if (responseData && responseData.data && responseData.data.id) {
                entityId = responseData.data.id;
            }
            else if (req.params.id) {
                entityId = parseInt(req.params.id);
            }
            // Only log if we have meaningful action
            if (action && entityType) {
                yield models_1.ActivityLog.create({
                    user_id: user.id,
                    action,
                    entity_type: entityType,
                    entity_id: entityId,
                    changes: responseData ? JSON.stringify(responseData) : null,
                    ip_address: req.ip || req.socket.remoteAddress || null,
                    user_agent: req.get('user-agent') || null,
                });
            }
        }
        catch (error) {
            // Don't fail request if logging fails
            console.error('Activity log error:', error);
        }
    }));
    next();
});
exports.logActivity = logActivity;
